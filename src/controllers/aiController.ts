import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import { generateUserFinanceSuggestions } from "../services/aiService";


export const getAISuggestions = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;


    const { period } = req.body;
    const selectedPeriod = period || "Current Period";

    const suggestions = await generateUserFinanceSuggestions(
      userId,
      selectedPeriod
    );

    return res.status(200).json({
      success: true,
      data: {
        suggestions,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI finance suggestions",
    });
  }
};
