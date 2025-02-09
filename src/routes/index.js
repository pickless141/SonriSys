import express from "express"
import usuarioRoute from "./usuariosRoutes/usuarioRoutes.js"
import authRoute from "./auth/authRoutes.js";

const router = express.Router();

router.use("/v1/users", usuarioRoute)
router.use("/v1/auth", authRoute)

export default router;
