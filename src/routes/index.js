import express from "express"
import usuarioRoute from "./usuariosRoutes/usuarioRoutes.js"
import authRoute from "./auth/authRoutes.js";
import pacienteRoute from "./pacientes/pacienteRoutes.js";
import historiaMedicaRoute from "./historiaMedica/historiaMedicaRoutes.js";
import tratamientosRoute from "./tratamientos/tratamientosRoutes.js";
import citasRoute from "./citas/citasRoutes.js";
import pagosRoute from "./pagos/pagosRoutes.js";

const router = express.Router();

router.use("/v1/auth", authRoute)
router.use("/v1/users", usuarioRoute)
router.use("/v1/pacientes", pacienteRoute)
router.use("/v1/historial-medico", historiaMedicaRoute)
router.use("/v1/tratamientos", tratamientosRoute)
router.use("/v1/citas", citasRoute)
router.use("/v1/pagos", pagosRoute)

export default router;
