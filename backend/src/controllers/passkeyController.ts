import { Request, Response } from 'express';
import { Buffer } from 'buffer';
import base64url from 'base64url';
import passkeyService from '../services/passkeyService';
import { Client as PasskeyClient } from 'passkey-kit-sdk';
import config from '../config';

export const generateRegistrationOptions = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    // Generate passkey registration options
    const options = {
      challenge: base64url(Buffer.from('challenge')),
      rp: {
        id: config.passkey.rpId,
        name: config.passkey.rpName,
      },
      user: {
        id: base64url(`user:${username}:${Date.now()}`),
        name: username,
        displayName: username,
      },
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    };
    
    // Store the challenge in session for verification later
    req.session.challenge = options.challenge;
    req.session.username = username;
    
    return res.status(200).json(options);
  } catch (error) {
    console.error('Error generating registration options:', error);
    return res.status(500).json({ error: 'Failed to generate registration options' });
  }
};

export const verifyRegistration = async (req: Request, res: Response) => {
  try {
    const { id, response } = req.body;
    const { username, challenge } = req.session;
    
    if (!username || !challenge) {
      return res.status(400).json({ error: 'Invalid session data' });
    }
    
    // Convert from base64url to Buffer
    const keyId = base64url.toBuffer(id);
    
    // Get public key from the attestation response
    const publicKey = await extractPublicKey(response);
    
    // Verify the challenge (simplified - in production you should perform proper verification)
    if (response.clientDataJSON !== challenge) {
      return res.status(400).json({ error: 'Challenge verification failed' });
    }
    
    // Deploy a new wallet contract
    const walletWasmHash = process.env.WALLET_WASM_HASH || 'your-default-wallet-wasm-hash';
    const { contractId, signedTx } = await passkeyService.deployWallet(keyId, publicKey, walletWasmHash);
    
    // Create a wallet client
    const wallet = new PasskeyClient({
      contractId,
      networkPassphrase: config.stellar.networkPassphrase,
      rpcUrl: config.stellar.rpcUrl,
    });
    
    // Store the user and wallet info in your database
    // This is a placeholder for your database logic
    
    return res.status(200).json({
      success: true,
      username,
      contractId,
      walletAddress: contractId, // In Soroban the contract ID is the wallet address
    });
  } catch (error) {
    console.error('Error verifying registration:', error);
    return res.status(500).json({ error: 'Failed to verify registration' });
  }
};

export const generateAuthenticationOptions = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    // Retrieve user from database (placeholder)
    // const user = await getUserByUsername(username);
    
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    
    // Generate authentication options
    const options = {
      challenge: base64url(Buffer.from('auth-challenge')),
      rpId: config.passkey.rpId,
      userVerification: 'preferred',
      timeout: config.passkey.timeout,
    };
    
    // Store the challenge in session for verification later
    req.session.challenge = options.challenge;
    req.session.username = username;
    
    return res.status(200).json(options);
  } catch (error) {
    console.error('Error generating authentication options:', error);
    return res.status(500).json({ error: 'Failed to generate authentication options' });
  }
};

export const verifyAuthentication = async (req: Request, res: Response) => {
  try {
    const { id, response } = req.body;
    const { username, challenge } = req.session;
    
    if (!username || !challenge) {
      return res.status(400).json({ error: 'Invalid session data' });
    }
    
    // Verify the authentication response
    // This is simplified - in production, perform proper verification
    if (response.clientDataJSON !== challenge) {
      return res.status(400).json({ error: 'Challenge verification failed' });
    }
    
    // Retrieve user & wallet from database (placeholder)
    // const user = await getUserByUsername(username);
    // const wallet = user.walletAddress;
    
    // Return success
    return res.status(200).json({
      success: true,
      username,
      // walletAddress: wallet
    });
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return res.status(500).json({ error: 'Failed to verify authentication' });
  }
};

// Helper function to extract the public key from an attestation response
async function extractPublicKey(response: any): Promise<Buffer> {
  // In a real implementation, you would verify the attestation and extract 
  // the public key from the attestation certificate
  // This is a placeholder function
  
  try {
    // Parse the attestationObject
    const attestationObj = Buffer.from(response.attestationObject, 'base64url');
    
    // Extract the public key (simplified)
    // In a real implementation, you would parse the CBOR data properly
    const publicKey = Buffer.alloc(32); // Placeholder
    
    return publicKey;
  } catch (error) {
    console.error('Error extracting public key:', error);
    throw new Error('Failed to extract public key from attestation response');
  }
} 