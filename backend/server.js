import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import foodRecommendationRoute from "./routes/foodrecommendation.route.js";
import authRoutes from "./routes/auth.routes.js";
import userInfoRoutes  from "./routes/userinfo.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// allows us to accept JSON data in the req.body
app.use(express.json());
// allows us to parse cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/foodrecommend", foodRecommendationRoute);
app.use("/api/profile", userInfoRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
  } else {
    console.log("Server started in test mode, database connection skipped");
  }
});

export { app };
