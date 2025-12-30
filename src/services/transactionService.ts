import Transaction from "../models/Transaction";
import Category from "../models/Category";
import { Op } from "sequelize";

interface CreateTransactionInput {
  amount: number;
  type: "income" | "expense";
  date: string;
  note?: string;
  categoryId: number;
}

interface UpdateTransactionInput {
  amount?: number;
  type?: "income" | "expense";
  date?: string;
  note?: string;
  categoryId?: number;
}


export const createTransaction = async (
  userId: number,
  data: CreateTransactionInput
) => {
  
  const category = await Category.findOne({
    where: {
      id: data.categoryId,
      userId,
    },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  if (category.type !== data.type) {
    throw new Error("Category type does not match transaction type");
  }

  return await Transaction.create({
    amount: data.amount,
    type: data.type,
    date: data.date,
    note: data.note,
    categoryId: category.id,
    userId,
  });
};


export const getUserTransactions = async (userId: number) => {
  return await Transaction.findAll({
    where: { userId },
    order: [["date", "DESC"]],
  });
};


export const updateTransaction = async (
  userId: number,
  transactionId: number,
  data: UpdateTransactionInput
) => {
  const transaction = await Transaction.findOne({
    where: { id: transactionId, userId },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  await transaction.update(data);

  return transaction;
};


export const deleteTransaction = async (
  userId: number,
  transactionId: number
) => {
  const transaction = await Transaction.findOne({
    where: { id: transactionId, userId },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  await transaction.destroy();
};


export const searchUserTransactions = async (
  userId: number,
  query: string
) => {
  return await Transaction.findAll({
    where: {
      userId,
      note: {
        [Op.like]: `%${query}%`,
      },
    },
    order: [["date", "DESC"]],
  });
};