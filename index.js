import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDB from "./src/config/db.js"
import indexRoutes from "./src/routes/index.js"

const app = express()

connectDB()

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", indexRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})