import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors());



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`)
})