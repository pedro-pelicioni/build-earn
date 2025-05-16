#!/bin/bash

# Exit on error
set -e

# Path to the timelock contract directory
CONTRACT_DIR="../contracts/soroban-timelock-contract"

# Check if the directory exists
if [ ! -d "$CONTRACT_DIR" ]; then
  echo "Error: Contract directory not found at $CONTRACT_DIR"
  exit 1
fi

# Navigate to the contract directory
cd "$CONTRACT_DIR"

# Check if the Stellar CLI is installed
if ! command -v stellar &> /dev/null; then
  echo "Error: Stellar CLI not found. Please install it with 'cargo install stellar-cli'"
  exit 1
fi

# Build the contract
echo "Building timelock contract..."
stellar contract build

# Get the path to the compiled WASM file
WASM_FILE=$(ls -la target/wasm32-unknown-unknown/release/*.wasm | head -n 1 | awk '{print $9}')

if [ -z "$WASM_FILE" ]; then
  echo "Error: WASM file not found after build"
  exit 1
fi

echo "Contract built successfully at: $WASM_FILE"

# Copy the WASM file to a more accessible location
mkdir -p ../../contracts
cp "$WASM_FILE" ../../contracts/soroban-timelock-contract.wasm

echo "Contract copied to ../../contracts/soroban-timelock-contract.wasm"
echo "You can now deploy it with 'npm run deploy-contract'" 