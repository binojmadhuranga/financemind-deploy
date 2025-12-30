import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import * as categoryService from "../services/categoryService";


export const createCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    const category = await categoryService.createCategory(
      req.user.id,
      name,
      type
    );

    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const getCategories = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const categories = await categoryService.getUserCategories(
      req.user.id
    );

    res.json(categories);
  } catch(err) {
     console.error("GET CATEGORIES ERROR 👉", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};


export const updateCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const categoryId = Number(req.params.id);

    const updatedCategory =
      await categoryService.updateCategory(
        req.user.id,
        categoryId,
        req.body
      );

    res.json(updatedCategory);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const deleteCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const categoryId = Number(req.params.id);

    await categoryService.deleteCategory(
      req.user.id,
      categoryId
    );

    res.json({ message: "Category deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
