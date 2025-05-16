// User related types
export interface User {
  id: string;
  username: string;
  publicKey?: string;
  walletAddress?: string;
  createdAt: Date;
}

// Task related types
export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  VERIFIED = 'verified',
  PAID = 'paid'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: TaskStatus;
  createdAt: Date;
  assignedTo?: string;
  completedAt?: Date;
  verifiedAt?: Date;
  paidAt?: Date;
}

// TimeLock related types
export interface TimeBound {
  kind: 'Before' | 'After';
  timestamp: number;
}

export interface ClaimableBalance {
  token: string;
  amount: string;
  claimants: string[];
  timeBound: TimeBound;
}

// Passkey related types
export interface SignerLimits {
  low: number;
  medium: number;
  high: number;
}

export type SignerStore = 'Persistent' | 'Temporary';

export interface SignerKey {
  key: 'Ed25519' | 'Secp256r1' | 'Policy';
  value: Uint8Array | string;
} 