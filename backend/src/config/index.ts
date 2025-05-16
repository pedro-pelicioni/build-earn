import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../..');

export const config = {
  // Server settings
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  rootDir,

  // Stellar settings
  stellar: {
    rpcUrl: process.env.RPC_URL || 'https://soroban-testnet.stellar.org',
    networkPassphrase: process.env.NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
    timelockContractId: process.env.TIMELOCK_CONTRACT_ID || '',
  },

  // Passkey settings
  passkey: {
    rpId: process.env.RP_ID || 'localhost',
    rpName: process.env.RP_NAME || 'BuildEarn',
    origin: process.env.ORIGIN || 'http://localhost:3000',
    timeout: 60000, // 1 minute in milliseconds
  },
};

// Validate necessary environment variables
if (!config.stellar.timelockContractId) {
  console.warn('Warning: TIMELOCK_CONTRACT_ID environment variable is not set.');
}

export default config; 