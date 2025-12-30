import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";


export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ id: user.id, email: user.email });

  return { token, user };
};


export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  
  };
};
