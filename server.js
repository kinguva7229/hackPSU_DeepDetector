import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import hashRoutes from "./src/routes/hashRoutes.js";

dotenv.config();

// ✅ create the express app FIRST
const app = express();

// ✅ set up middleware AFTER app is created
app.use(cors());
app.use(bodyParser.json());

// ✅ connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ set up routes
app.use("/api/users", hashRoutes);

// ✅ default route
app.get("/", (req, res) => res.send("DeepScan backend running ✅"));

// ✅ start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
