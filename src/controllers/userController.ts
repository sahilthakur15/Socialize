import userServices from "../services/userServices";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
       res.status(400).json({ message: "Please fill all the fields" });
    }

    const isUserExist = await userServices.checkUser(email);

    if (isUserExist) {
     res.status(400).json({ message: "User already exists" });
    }

    const newUser = await userServices.createUser(name, email, password);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
