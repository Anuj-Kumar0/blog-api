import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(express.json());

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);

export default app;