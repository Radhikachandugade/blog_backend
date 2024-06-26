import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); // Parsing HTTP request body

const corsOptions = {
  origin: "https://blog-mastertech-psi.vercel.app",
  credentials: true, // if you're using cookies or sessions
};

app.use(cors(corsOptions));

// Static file serving
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
