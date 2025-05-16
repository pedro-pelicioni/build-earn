#!/usr/bin/env ts-node

import { Contract, Server } from '@stellar/stellar-sdk/minimal/rpc';
import { Keypair, TransactionBuilder, Operation, Networks, xdr } from '@stellar/stellar-sdk/minimal';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const rpcUrl = process.env.RPC_URL || 'https://soroban-testnet.stellar.org';
const networkPassphrase = process.env.NETWORK_PASSPHRASE || Networks.TESTNET;

// Path to the compiled WASM file
const contractPath = path.join(__dirname, '../../contracts/soroban-timelock-contract.wasm');

async function deployTimelockContract() {
  try {
    console.log('Deploying Timelock Contract...');
    console.log(`RPC URL: ${rpcUrl}`);
    console.log(`Network: ${networkPassphrase}`);

    // Create RPC server instance
    const server = new Server(rpcUrl);

    // Create admin account for contract deployment
    // In production, you would use a secure keypair
    const adminKeypair = Keypair.random();
    console.log(`Admin Public Key: ${adminKeypair.publicKey()}`);
    console.log(`Admin Secret Key: ${adminKeypair.secret()}`);

    // Fund account on testnet (for testing only)
    console.log('Funding account...');
    try {
      const fundResponse = await fetch(`https://friendbot.stellar.org?addr=${adminKeypair.publicKey()}`);
      if (!fundResponse.ok) {
        throw new Error('Failed to fund account');
      }
      console.log('Account funded successfully');
    } catch (error) {
      console.error('Error funding account:', error);
      throw error;
    }

    // Read the WASM file
    console.log(`Reading contract from: ${contractPath}`);
    if (!fs.existsSync(contractPath)) {
      throw new Error(`Contract WASM file not found at: ${contractPath}`);
    }
    
    const contractCode = fs.readFileSync(contractPath);
    
    // Get the account sequence
    const account = await server.getAccount(adminKeypair.publicKey());
    
    // Upload contract code
    console.log('Uploading contract code...');
    const uploadTx = new TransactionBuilder(account.accountId, {
      fee: '100',
      networkPassphrase
    })
      .addOperation(Operation.uploadContractWasm({ wasm: contractCode }))
      .setTimeout(30)
      .build();

    uploadTx.sign(adminKeypair);
    const uploadResponse = await server.sendTransaction(uploadTx);
    
    if (uploadResponse.status !== 'PENDING') {
      throw new Error(`Failed to upload contract: ${JSON.stringify(uploadResponse)}`);
    }
    
    // Wait for transaction to complete
    console.log('Waiting for upload to complete...');
    const uploadResult = await server.getTransaction(uploadResponse.hash);
    
    // Extract the WASM hash from the result
    const wasmHash = uploadResult.returnValue().u128().toString('hex');
    console.log(`Contract WASM hash: ${wasmHash}`);
    
    // Deploy the contract
    console.log('Deploying contract...');
    const deployTx = new TransactionBuilder(account.accountId, {
      fee: '100',
      networkPassphrase
    })
      .addOperation(Operation.createContractHostFunction({
        wasmHash,
        salt: Buffer.from('build-earn-timelock')
      }))
      .setTimeout(30)
      .build();
      
    deployTx.sign(adminKeypair);
    const deployResponse = await server.sendTransaction(deployTx);
    
    if (deployResponse.status !== 'PENDING') {
      throw new Error(`Failed to deploy contract: ${JSON.stringify(deployResponse)}`);
    }
    
    // Wait for transaction to complete
    console.log('Waiting for deployment to complete...');
    const deployResult = await server.getTransaction(deployResponse.hash);
    
    // Extract the contract ID from the result
    const contractId = deployResult.returnValue().address().contractId().toString('hex');
    console.log('\n=== Deployment Successful ===');
    console.log(`Contract ID: ${contractId}`);
    console.log('\nAdd this to your .env file:');
    console.log(`TIMELOCK_CONTRACT_ID=${contractId}`);
    
    return contractId;
  } catch (error) {
    console.error('Error deploying contract:', error);
    throw error;
  }
}

// Run the deployment if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  deployTimelockContract()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Deployment failed:', error);
      process.exit(1);
    });
}

export { deployTimelockContract }; 