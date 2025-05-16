# build.earn - Crypto Bounties & Freelance Platform

<div align="center">

![build.earn Platform](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/THE%20Community-Driven%20Platform%20for%20Bounties%20%26%20Freelance%20Work-jepXIPGbGxwoDdWj1xryelPSMUFJDg.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stellar](https://img.shields.io/badge/Stellar-Powered-brightgreen.svg)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart_Contracts-orange.svg)](https://soroban.stellar.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

</div>

## 📋 Overview

build.earn is a decentralized marketplace connecting crypto projects with talented freelancers. The platform facilitates bounties, projects, and grants in the blockchain ecosystem, with secure and transparent payments in XLM (Stellar Lumens) through Soroban smart contracts.

Our mission is to accelerate innovation in the crypto space by providing a trusted platform where projects can easily find qualified talent, and where freelancers can discover exciting opportunities to contribute to groundbreaking blockchain initiatives.

## 🚀 Features

- **Bounties & Freelance Gigs**: Browse and filter opportunities by category (Content, Design, Development) and status (Open, In Review, Completed)
- **Detailed Job Listings**: Comprehensive job details including requirements, rewards, and application instructions
- **Grants Program**: Discover equity-free funding opportunities from leading crypto protocols
- **XLM Payments**: All payments are made in XLM with USD equivalent values displayed for transparency
- **Stellar Timelock Escrow**: Secure payment protection through Soroban smart contracts
- **Passkey Authentication**: Seamless and secure web3 authentication using WebAuthn passkeys
- **Reputation System**: Build your profile with verifiable on-chain work history
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop devices

## 🏗️ Architecture

The project follows a modern, scalable architecture:

### Frontend (Next.js)
- **App Router**: Server components and client components for optimal performance
- **TypeScript**: Type-safe development experience
- **Component Library**: Built with Shadcn UI and Tailwind CSS
- **Authentication**: Passkey (WebAuthn) integration for passwordless login

### Backend (Node.js/Express)
- **RESTful API**: Express.js with TypeScript
- **Stellar Integration**: Direct connection to Stellar blockchain
- **Soroban Smart Contracts**: Custom timelock contract for secure escrow functionality
- **Passkey Service**: WebAuthn passkey implementation for account abstraction

### Smart Contracts
- **Soroban Timelock Contract**: Escrow mechanism for secure task rewards
- **Written in Rust**: High-performance, memory-safe smart contract implementation
- **Testnet Deployment**: Currently deployed on Stellar Testnet for testing

## 💻 Technologies

### Frontend
- **Next.js 14**: React framework with App Router for efficient page routing and server components
- **TypeScript**: Type-safe JavaScript for better developer experience and fewer bugs
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/UI**: High-quality UI components built with Radix UI and Tailwind CSS
- **React Hook Form + Zod**: Type-safe form validation
- **Lucide Icons**: Beautiful, consistent icon set
- **Next Themes**: Dark/light mode theming

### Backend
- **Express.js**: Robust, minimalist web framework for Node.js
- **TypeScript**: Type-safe JavaScript for backend development
- **@stellar/stellar-sdk**: Official Stellar SDK for JavaScript
- **@simplewebauthn**: WebAuthn library for passkey authentication
- **passkey-kit-sdk**: Stellar passkey implementation for account abstraction
- **sac-sdk**: Stellar account controller SDK

### Blockchain & Smart Contracts
- **Stellar Blockchain**: Fast, low-cost blockchain with built-in DEX
- **Soroban**: Stellar's smart contract platform
- **Timelock Contract**: Custom escrow contract written in Rust
- **XLM**: Native token used for all platform transactions

## ⚙️ Stellar Timelock Escrow Contract

Our platform uses a custom Soroban timelock contract to provide secure escrow services:

1. **Deposit**: Project owners deposit XLM rewards into the contract when creating a bounty
2. **Assignment**: Freelancers are assigned tasks through contract verification
3. **Timelock**: Funds are locked for a set period with conditional release criteria
4. **Verification**: Project owners verify completed work
5. **Release**: Funds are automatically released to freelancers upon verification
6. **Dispute Resolution**: Timelock mechanism allows for dispute resolution within a set period

Contract deployment and interaction are handled through the backend API, providing a seamless user experience while maintaining blockchain security.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Stellar wallet (for testing payment features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/build-earn.git
   cd build-earn
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up frontend environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your own values.

4. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

5. Set up backend environment variables:
   ```bash
   cp .env.example .env
   ```

6. Deploy the Soroban timelock contract (optional, for development):
   ```bash
   npm run build-contract
   npm run deploy-contract
   ```

7. Run the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (new terminal)
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📊 Project Structure

```
build-earn/
├── frontend/               # Next.js frontend application
│   ├── app/                # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── components/     # UI components
│   │   └── (routes)/       # Page routes
│   ├── components/         # Shared UI components
│   ├── lib/                # Shared library code
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles
│   └── public/             # Static assets
│
├── backend/                # Express.js backend
│   ├── src/                # Source code
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration
│   │   └── types/          # TypeScript types
│   └── scripts/            # Deployment scripts
│
└── contracts/              # Soroban smart contracts
    ├── src/                # Contract source code (Rust)
    └── target/             # Compiled WASM contracts
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 🚢 Deployment

### Frontend
The frontend is set up for easy deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Vercel will automatically deploy your application

### Backend
Deploy the backend to your preferred Node.js hosting service:

1. Build the TypeScript project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Smart Contracts
Deploy the Soroban contracts to Stellar:

1. Build the contract:
   ```bash
   cd backend
   npm run build-contract
   ```

2. Deploy to Stellar Testnet or Mainnet:
   ```bash
   npm run deploy-contract
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Stellar Development Foundation](https://stellar.org) for their support
- All our contributors and community members
- Special thanks to the open-source projects that made this possible