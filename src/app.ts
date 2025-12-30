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
    origin: "https://finance-mind-web.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "FinanceMind API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ai", aiRoutes);

export default app;
