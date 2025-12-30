import Category from "../models/Category";
import Transaction from "../models/Transaction";
import { literal } from "sequelize";


export const createCategory = async (
  userId: number,
  name: string,
  type: "income" | "expense"
) => {
  
  const existing = await Category.findOne({
    where: { userId, name, type },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    name,
    type,
    userId,
  });
};


export const getUserCategories = async (userId: number) => {
  return await Category.findAll({
    where: { userId },
    attributes: [
      "id",
      "name",
      "type",
      [
        literal(`
          COALESCE(
            SUM(
              CASE
                WHEN CAST("Transactions"."type" AS TEXT)
                   = CAST("Category"."type" AS TEXT)
                THEN CAST("Transactions"."amount" AS DECIMAL)
                ELSE 0
              END
            ),
            0
          )
        `),
        "totalAmount",
      ],
    ],
    include: [
      {
        model: Transaction,
        attributes: [],
        required: false,
      },
    ],
    group: ["Category.id", "Category.name", "Category.type"],
    order: [["name", "ASC"]],
  });
};


export const updateCategory = async (
  userId: number,
  categoryId: number,
  data: { name?: string; type?: "income" | "expense" }
) => {
  const category = await Category.findOne({
    where: { id: categoryId, userId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await category.update(data);
  return category;
};


export const deleteCategory = async (
  userId: number,
  categoryId: number
) => {
  const category = await Category.findOne({
    where: { id: categoryId, userId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await category.destroy();
};
