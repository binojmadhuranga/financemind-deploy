import { fn, col } from "sequelize";
import { Category, Transaction } from "../models";
import { geminiFlashModel } from "../utils/geminiClient";

interface CategoryTotal {
  name: string;
  totalAmount: string;
}


export const generateUserFinanceSuggestions = async (
  userId: number,
  period: string = "Current Period"
): Promise<string> => {

    
  const expenseCategories = (await Category.findAll({
  where: {
    userId,
    type: "expense",
  },
  attributes: [
    "name",
    [fn("SUM", col("Transactions.amount")), "totalAmount"],
  ],
  include: [
    {
      model: Transaction,
      attributes: [],
      where: {
        userId,
        type: "expense",
      },
    },
  ],
  group: ["Category.id"],
  raw: true,
})) as unknown as CategoryTotal[];


  const incomeCategories = (await Category.findAll({
  where: {
    userId,
    type: "income",
  },
  attributes: [
    "name",
    [fn("SUM", col("Transactions.amount")), "totalAmount"],
  ],
  include: [
    {
      model: Transaction,
      attributes: [],
      where: {
        userId,
        type: "income",
      },
    },
  ],
  group: ["Category.id"],
  raw: true,
})) as unknown as CategoryTotal[];


  const totalExpense = expenseCategories.reduce(
    (sum, c) => sum + Number(c.totalAmount),
    0
  );

  const totalIncome = incomeCategories.reduce(
    (sum, c) => sum + Number(c.totalAmount),
    0
  );

  /**
   *  Format data for AI
   */
  const formattedExpenses =
    expenseCategories.length > 0
      ? expenseCategories
          .map(
            (c) =>
              `- ${c.name}: ${Number(c.totalAmount).toFixed(2)}`
          )
          .join("\n")
      : "- No expense data";

  const formattedIncome =
    incomeCategories.length > 0
      ? incomeCategories
          .map(
            (c) =>
              `- ${c.name}: ${Number(c.totalAmount).toFixed(2)}`
          )
          .join("\n")
      : "- No income data";

  /**
   *  Prompt for Gemini
   */
  const prompt = `
You are a financial assistant for a personal finance application.

Analyze the user's income and expense data and give practical, realistic suggestions.

Rules:
- Be concise
- Use bullet points
- Do NOT give investment or legal advice
- Focus on budgeting, saving, and spending habits
- Currency: LKR

Period: ${period}

Summary:
Total Income: ${totalIncome.toFixed(2)}
Total Expense: ${totalExpense.toFixed(2)}

Income by Category:
${formattedIncome}

Expense by Category:
${formattedExpenses}

Output format:
1. Spending & income overview (2 lines)
2. Key observations (bullet points)
3. Improvement suggestions (bullet points)
4. One short motivational tip
`;


  const result = await geminiFlashModel.generateContent(prompt);

  return result.response.text();
};
