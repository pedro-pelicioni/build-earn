import { Router } from 'express';
import * as passkeyController from '../controllers/passkeyController';
import * as taskController from '../controllers/taskController';

const router = Router();

// Passkey authentication routes
router.post('/auth/register/options', passkeyController.generateRegistrationOptions);
router.post('/auth/register/verify', passkeyController.verifyRegistration);
router.post('/auth/login/options', passkeyController.generateAuthenticationOptions);
router.post('/auth/login/verify', passkeyController.verifyAuthentication);

// Task management routes
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.get('/tasks/:taskId', taskController.getTaskById);
router.post('/tasks/:taskId/assign', taskController.assignTask);
router.post('/tasks/:taskId/complete', taskController.completeTask);
router.post('/tasks/:taskId/verify', taskController.verifyTask);
router.post('/tasks/:taskId/payout', taskController.payoutTask);
router.post('/tasks/:taskId/claim', taskController.claimPayment);

export default router; 