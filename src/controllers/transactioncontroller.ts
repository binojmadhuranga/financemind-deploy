import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import * as transactionService from "../services/transactionService";

export const createTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transaction = await transactionService.createTransaction(
      req.user.id,
      req.body
    );

    res.status(201).json(transaction);
  } catch {
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

export const getTransactions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await transactionService.getUserTransactions(
      req.user.id
    );

    res.json(transactions);
  } catch {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};


export const updateTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactionId = Number(req.params.id);

    const updatedTransaction =
      await transactionService.updateTransaction(
        req.user.id,
        transactionId,
        req.body
      );

    res.json(updatedTransaction);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactionId = Number(req.params.id);

    await transactionService.deleteTransaction(
      req.user.id,
      transactionId
    );

    res.json({ message: "Transaction deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const searchTransactions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query = req.query.query as string;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const transactions =
      await transactionService.searchUserTransactions(
        req.user.id,
        query
      );

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to search transactions" });
  }
};
