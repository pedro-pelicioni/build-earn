# Build-Earn Backend

This is the backend for the Build-Earn platform, providing account abstraction with passkeys and Stellar-based escrow/timelock contract integration.

## Features

- **Passkey-based Authentication**: User account creation and management using WebAuthn passkeys.
- **Stellar Smart Contracts**: Integration with Soroban timelock contracts for secure task reward distribution.
- **Task Management**: API for creating, assigning, completing, verifying, and paying out tasks.

## Getting Started

### Prerequisites

- Node.js v20 or higher
- A deployed Stellar timelock contract (use the provided Soroban contract in `/contracts`)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/build-earn.git
   cd build-earn/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the provided `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration values:
   ```
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Stellar Configuration
   RPC_URL=https://soroban-testnet.stellar.org
   NETWORK_PASSPHRASE=Test SDF Network ; September 2015
   TIMELOCK_CONTRACT_ID=your_contract_id_here

   # Passkey Configuration
   RP_ID=localhost
   RP_NAME=BuildEarn
   ORIGIN=http://localhost:3000
   ```

### Running the Server

For development:
```
npm run dev
```

For production:
```
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register/options` - Get registration options
- `POST /api/auth/register/verify` - Verify registration and create wallet
- `POST /api/auth/login/options` - Get authentication options
- `POST /api/auth/login/verify` - Verify authentication

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:taskId` - Get a specific task
- `POST /api/tasks/:taskId/assign` - Assign a task to a user
- `POST /api/tasks/:taskId/complete` - Mark a task as completed
- `POST /api/tasks/:taskId/verify` - Verify a completed task
- `POST /api/tasks/:taskId/payout` - Pay out rewards using timelock contract
- `POST /api/tasks/:taskId/claim` - Claim rewards from timelock contract

## Architecture

The backend is built with:

- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **Passkey-Kit**: Stellar passkey SDK for account abstraction
- **Soroban SDK**: For interacting with Stellar smart contracts

### Core Components

1. **Passkey Service**: Handles user account creation and authentication using passkeys
2. **Timelock Service**: Interfaces with the Stellar timelock contract for secure reward distribution
3. **Controllers**: Handle API requests and responses
4. **Routes**: Define API endpoints

## Timelock Contract

The backend integrates with a Soroban-based timelock contract for secure reward distribution. The contract allows:

1. Task creators to deposit rewards
2. Task completers to claim rewards after verification
3. Time-bound conditions for when rewards can be claimed

## Security Considerations

- This is a demonstration implementation and should be hardened for production use
- Add proper session management for production
- Implement database storage instead of in-memory storage
- Add authentication middleware to protect endpoints

## License

[MIT](LICENSE) 