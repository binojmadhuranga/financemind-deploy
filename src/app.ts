import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import transactionRoutes from "./routes/transactionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import aiRoutes from "./routes/aiRoutes";
import "./models";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5050",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ai", aiRoutes);

export default app;
