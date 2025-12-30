import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  searchTransactions,
} from "../controllers/transactioncontroller";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/search", authMiddleware, searchTransactions);
router.get("/", authMiddleware, getTransactions);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);


export default router;
