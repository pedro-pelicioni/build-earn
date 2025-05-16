import { Contract, Server } from '@stellar/stellar-sdk/minimal/rpc';
import { Address, Keypair, TransactionBuilder, xdr } from '@stellar/stellar-sdk/minimal';
import type { TimeBound, ClaimableBalance } from '../types';
import config from '../config';

// TimeLock contract client class
class TimelockService {
  private rpc: Server;
  private contractId: string;
  
  constructor() {
    this.rpc = new Server(config.stellar.rpcUrl);
    
    if (!config.stellar.timelockContractId) {
      throw new Error('Timelock contract ID is not configured. Set TIMELOCK_CONTRACT_ID in your .env file.');
    }
    
    this.contractId = config.stellar.timelockContractId;
  }

  /**
   * Deposit funds into the timelock contract for a task reward
   */
  public async deposit(
    fromAccount: Keypair,
    tokenAddress: string,
    amount: string,
    claimants: string[],
    timeBound: TimeBound
  ) {
    try {
      // Create contract instance
      const contract = new Contract(this.contractId);
      
      // Convert addresses to xdr format
      const claimantsXdr = claimants.map(claimant => 
        new Address(claimant)
      );
      
      // Create time bound xdr object
      const timeBoundXdr = {
        kind: timeBound.kind === 'Before' 
          ? { tag: 'Before', values: undefined } 
          : { tag: 'After', values: undefined },
        timestamp: timeBound.timestamp
      };
      
      // Build the transaction
      const tx = new TransactionBuilder(
        (await this.rpc.getAccount(fromAccount.publicKey())).accountId,
        {
          fee: '100',
          networkPassphrase: config.stellar.networkPassphrase,
        }
      )
      .addOperation(
        contract.call(
          'deposit',
          fromAccount.publicKey(),
          tokenAddress,
          amount,
          claimantsXdr,
          timeBoundXdr
        )
      )
      .setTimeout(30)
      .build();
      
      // Sign the transaction
      tx.sign(fromAccount);
      
      // Submit the transaction
      const response = await this.rpc.sendTransaction(tx);
      
      return response;
    } catch (error) {
      console.error('Error depositing to timelock contract:', error);
      throw error;
    }
  }

  /**
   * Claim funds from the timelock contract upon task completion
   */
  public async claim(claimant: Keypair) {
    try {
      // Create contract instance
      const contract = new Contract(this.contractId);
      
      // Build the transaction
      const tx = new TransactionBuilder(
        (await this.rpc.getAccount(claimant.publicKey())).accountId,
        {
          fee: '100',
          networkPassphrase: config.stellar.networkPassphrase,
        }
      )
      .addOperation(
        contract.call(
          'claim',
          claimant.publicKey()
        )
      )
      .setTimeout(30)
      .build();
      
      // Sign the transaction
      tx.sign(claimant);
      
      // Submit the transaction
      const response = await this.rpc.sendTransaction(tx);
      
      return response;
    } catch (error) {
      console.error('Error claiming from timelock contract:', error);
      throw error;
    }
  }

  /**
   * Retrieve the current claimable balance from the contract
   */
  public async getClaimableBalance(): Promise<ClaimableBalance | null> {
    try {
      // Get contract data
      const scVal = await this.rpc.getContractData(
        this.contractId,
        xdr.ScVal.scvSymbol('Balance')
      );
      
      if (scVal.value() === null) {
        return null;
      }
      
      // Parse the claimable balance from the contract data
      const map = scVal.value()?.map();
      if (!map) {
        return null;
      }
      
      // Extract values from the ScVal
      const token = map[0].val.address().accountId().ed25519().toString('hex');
      const amount = map[1].val.i128().toString();
      
      const claimants: string[] = [];
      const claimantsVec = map[2].val.vec();
      if (claimantsVec) {
        for (const claimant of claimantsVec) {
          claimants.push(claimant.address().accountId().ed25519().toString('hex'));
        }
      }
      
      const timeBoundKind = map[3].val.vec()?.[0].sym();
      const timeBoundTimestamp = map[3].val.vec()?.[1].u64().toString();
      
      return {
        token,
        amount,
        claimants,
        timeBound: {
          kind: timeBoundKind === 'Before' ? 'Before' : 'After',
          timestamp: parseInt(timeBoundTimestamp || '0', 10)
        }
      };
    } catch (error) {
      console.error('Error getting claimable balance:', error);
      return null;
    }
  }
}

export default new TimelockService(); 