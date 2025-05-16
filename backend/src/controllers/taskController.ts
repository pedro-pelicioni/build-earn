import { Request, Response } from 'express';
import { Keypair } from '@stellar/stellar-sdk/minimal';
import timelockService from '../services/timelockService';
import { TaskStatus } from '../types';
import config from '../config';

// This is a simplified controller without a real database
// In a production environment, you would use a proper database

// In-memory task storage (placeholder)
const tasks: Record<string, any> = {};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, reward, tokenAddress } = req.body;
    
    if (!title || !description || !reward || !tokenAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Generate a unique task ID
    const taskId = `task_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    // Create a new task
    const task = {
      id: taskId,
      title,
      description,
      reward,
      tokenAddress,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
    };
    
    // Store the task in our in-memory database
    tasks[taskId] = task;
    
    return res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Return all tasks as an array
    return res.status(200).json(Object.values(tasks));
  } catch (error) {
    console.error('Error getting tasks:', error);
    return res.status(500).json({ error: 'Failed to get tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    return res.status(500).json({ error: 'Failed to get task' });
  }
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.status !== TaskStatus.OPEN) {
      return res.status(400).json({ error: 'Task is not available for assignment' });
    }
    
    // Update task status and assign to user
    task.status = TaskStatus.IN_PROGRESS;
    task.assignedTo = userId;
    
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error assigning task:', error);
    return res.status(500).json({ error: 'Failed to assign task' });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.status !== TaskStatus.IN_PROGRESS) {
      return res.status(400).json({ error: 'Task is not in progress' });
    }
    
    if (task.assignedTo !== userId) {
      return res.status(403).json({ error: 'Task is not assigned to this user' });
    }
    
    // Update task status
    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();
    
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error completing task:', error);
    return res.status(500).json({ error: 'Failed to complete task' });
  }
};

export const verifyTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.status !== TaskStatus.COMPLETED) {
      return res.status(400).json({ error: 'Task is not completed' });
    }
    
    // Update task status
    task.status = TaskStatus.VERIFIED;
    task.verifiedAt = new Date();
    
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error verifying task:', error);
    return res.status(500).json({ error: 'Failed to verify task' });
  }
};

export const payoutTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { payerSecret } = req.body; // In a real system, this would use proper authentication
    
    if (!payerSecret) {
      return res.status(400).json({ error: 'Payer secret is required' });
    }
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.status !== TaskStatus.VERIFIED) {
      return res.status(400).json({ error: 'Task is not verified' });
    }
    
    // Get the payer keypair from the secret
    const payerKeypair = Keypair.fromSecret(payerSecret);
    
    // Get user's wallet address (in a real system this would be retrieved from a database)
    const userAddress = task.assignedTo; // This would be the user's wallet address
    
    // Create a timebound for the contract
    // Allow claiming after the current time (immediate availability)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timeBound = {
      kind: 'After' as const,
      timestamp: currentTimestamp - 60, // Available from 1 minute ago (immediate availability)
    };
    
    // Deposit the reward in the timelock contract
    await timelockService.deposit(
      payerKeypair,
      task.tokenAddress,
      task.reward.toString(),
      [userAddress], // Claimants - only the assigned user can claim
      timeBound
    );
    
    // Update task status
    task.status = TaskStatus.PAID;
    task.paidAt = new Date();
    
    return res.status(200).json({
      success: true,
      message: 'Task payment has been deposited in the timelock contract',
      task
    });
  } catch (error) {
    console.error('Error paying out task:', error);
    return res.status(500).json({ error: 'Failed to pay out task' });
  }
};

export const claimPayment = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { userSecret } = req.body; // In a real system, this would use proper authentication
    
    if (!userSecret) {
      return res.status(400).json({ error: 'User secret is required' });
    }
    
    // Retrieve the task from our in-memory database
    const task = tasks[taskId];
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.status !== TaskStatus.PAID) {
      return res.status(400).json({ error: 'Task payment is not available for claiming' });
    }
    
    // Get the user keypair from the secret
    const userKeypair = Keypair.fromSecret(userSecret);
    
    // Claim the payment from the timelock contract
    const result = await timelockService.claim(userKeypair);
    
    return res.status(200).json({
      success: true,
      message: 'Task payment has been claimed successfully',
      transactionResult: result
    });
  } catch (error) {
    console.error('Error claiming payment:', error);
    return res.status(500).json({ error: 'Failed to claim payment' });
  }
}; 