import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/", commentRoutes);

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;