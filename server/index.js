import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
dotenv.config();

// routes 
import userRouter from "./src/routes/user.routes.js";


const app = express();
connectDB()
const PORT = process.env.PORT || 4000;


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/v1/auth', userRouter)

app.get("/", (req, res) => {
  res.json({
    message: "server is running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
