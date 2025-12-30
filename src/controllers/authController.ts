import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // REQUIRED on HTTPS
      sameSite: "none",    // REQUIRED for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};


export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await getUserById(userId);

    res.json(user);
  } catch (err: any) {
    res.status(401).json({ error: "Unauthorized" });
  }
};


export const logout = (_req: Request, res: Response) => {
 res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

  res.json({ message: "Logged out successfully" });
};
