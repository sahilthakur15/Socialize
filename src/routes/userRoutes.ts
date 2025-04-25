import express from 'express';
import { registerUser } from '../controllers/userController';

const router = express.Router();

// No need for type casting here, just use the function directly
router.post('/register', registerUser);

export default router;
