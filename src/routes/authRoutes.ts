import express, { Request, Response } from 'express';  
import { AuthRoutes } from '../utils/ENUMS/routes';  
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();


router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);  
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.post("/auth/login", async (req: Request, res: Response) => {
    try {
      await loginUser(req, res); 
    } catch (error) {
      console.error('Login route error:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });
  

export default router;
