import { Router } from "express";
import { getAISuggestions } from "../controllers/aiController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/suggestions", authMiddleware, getAISuggestions);

export default router;
