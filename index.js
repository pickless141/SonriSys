import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import indexRoutes from "./src/routes/index.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"]; 

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido"));
      }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(morgan("dev"));

app.use("/api", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});