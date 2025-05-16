import { Keypair } from '@stellar/stellar-sdk/minimal';
import base64url from 'base64url';
import { Buffer } from 'buffer';
import type { SignerKey, SignerLimits, SignerStore } from '../types';
import config from '../config';
import { Client as PasskeyClient, type Signature } from 'passkey-kit-sdk';
import { hash } from '@stellar/stellar-sdk/minimal';

class PasskeyService {
  private keyPair: Keypair;
  private walletPublicKey: string;

  constructor() {
    // Generate a deterministic keypair for deploying new wallets
    this.keyPair = Keypair.fromRawEd25519Seed(hash(Buffer.from('build-earn')));
    this.walletPublicKey = this.keyPair.publicKey();
  }

  /**
   * Deploy a new smart wallet contract using a passkey
   */
  public async deployWallet(keyId: Uint8Array, publicKey: Uint8Array, walletWasmHash: string) {
    try {
      const at = await PasskeyClient.deploy(
        {
          signer: {
            tag: 'Secp256r1',
            values: [
              keyId,
              publicKey,
              [undefined],
              [undefined],
              { tag: 'Persistent', values: undefined },
            ]
          }
        },
        {
          rpcUrl: config.stellar.rpcUrl,
          wasmHash: walletWasmHash,
          networkPassphrase: config.stellar.networkPassphrase,
          publicKey: this.walletPublicKey,
          salt: hash(keyId),
          timeoutInSeconds: config.passkey.timeout / 1000, // Convert to seconds
        }
      );

      const contractId = at.result.options.contractId;

      // Sign the transaction
      await at.sign({
        signTransaction: (tx: any) => {
          return {
            ...tx,
            signatures: [this.keyPair.sign(tx.hash())],
          };
        }
      });

      return {
        contractId,
        signedTx: at.signed
      };
    } catch (error) {
      console.error('Error deploying wallet:', error);
      throw error;
    }
  }

  /**
   * Get contract ID from keyId
   */
  public getContractId(keyId: Uint8Array): string {
    try {
      // Encode the contract ID using the wallet public key and keyId
      const contractIdBytes = new Uint8Array(32);
      const walletKeyBytes = Buffer.from(StrKey.decodeEd25519PublicKey(this.walletPublicKey));
      
      // Use first 28 bytes of the wallet key
      contractIdBytes.set(walletKeyBytes.slice(0, 28));
      
      // Use first 4 bytes of the keyId hash
      const keyIdHash = hash(keyId);
      contractIdBytes.set(keyIdHash.slice(0, 4), 28);
      
      return StrKey.encodeContract(contractIdBytes);
    } catch (error) {
      console.error('Error getting contract ID:', error);
      throw error;
    }
  }

  /**
   * Add a Secp256r1 signer (passkey) to a wallet
   */
  public async addSecp256r1Signer(
    client: PasskeyClient,
    keyId: Uint8Array | string,
    publicKey: Uint8Array | string,
    limits: SignerLimits,
    store: SignerStore
  ) {
    try {
      keyId = typeof keyId === 'string' ? base64url.toBuffer(keyId) : keyId;
      publicKey = typeof publicKey === 'string' ? base64url.toBuffer(publicKey) : publicKey;

      return await client.add_signer({
        signer: {
          tag: 'Secp256r1',
          values: [
            Buffer.from(keyId),
            Buffer.from(publicKey),
            [undefined], // expiration: undefined
            this.getSignerLimits(limits),
            { tag: store, values: undefined },
          ],
        },
      }, {
        timeoutInSeconds: config.passkey.timeout / 1000, // Convert to seconds
      });
    } catch (error) {
      console.error('Error adding Secp256r1 signer:', error);
      throw error;
    }
  }

  /**
   * Add an Ed25519 signer to a wallet
   */
  public async addEd25519Signer(
    client: PasskeyClient,
    publicKey: string,
    limits: SignerLimits,
    store: SignerStore
  ) {
    try {
      return await client.add_signer({
        signer: {
          tag: 'Ed25519',
          values: [
            Buffer.from(StrKey.decodeEd25519PublicKey(publicKey)),
            [undefined], // expiration: undefined
            this.getSignerLimits(limits),
            { tag: store, values: undefined },
          ],
        },
      }, {
        timeoutInSeconds: config.passkey.timeout / 1000, // Convert to seconds
      });
    } catch (error) {
      console.error('Error adding Ed25519 signer:', error);
      throw error;
    }
  }

  /**
   * Remove a signer from a wallet
   */
  public async removeSigner(client: PasskeyClient, signer: SignerKey) {
    try {
      return await client.remove_signer({
        signer_key: this.getSignerKey(signer)
      }, {
        timeoutInSeconds: config.passkey.timeout / 1000, // Convert to seconds
      });
    } catch (error) {
      console.error('Error removing signer:', error);
      throw error;
    }
  }

  /**
   * Helper method to convert SignerLimits to the Soroban contract format
   */
  private getSignerLimits(limits: SignerLimits) {
    return {
      low: limits.low,
      medium: limits.medium,
      high: limits.high,
    };
  }

  /**
   * Helper method to convert SignerKey to the Soroban contract format
   */
  private getSignerKey({ key: tag, value }: SignerKey) {
    switch (tag) {
      case 'Ed25519':
        return {
          tag: 'Ed25519',
          values: [typeof value === 'string' ? Buffer.from(StrKey.decodeEd25519PublicKey(value)) : value]
        };
      case 'Secp256r1':
        return {
          tag: 'Secp256r1',
          values: [typeof value === 'string' ? base64url.toBuffer(value) : value]
        };
      case 'Policy':
        return {
          tag: 'Policy',
          values: [value]
        };
      default:
        throw new Error(`Unsupported signer type: ${tag}`);
    }
  }
}

export default new PasskeyService(); 