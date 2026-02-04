import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
const app: Application = express();

//middleware
app.use(cors({
  origin: [
    "http://18.117.220.60:3000",   // UI origin
    //"http://localhost:3000"        // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

//routes
app.use("/api/tasks", taskRoutes);

async function connectDB(): Promise<void> {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("Error connecting to DB", error.message);
    process.exit(1);
  }
}
connectDB();

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost ${PORT}`));
