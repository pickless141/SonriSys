import express from "express";
import historiaMedicaController from "../../controllers/Pacientes/historialMedicoController.js";
import verificarToken from "../../middlewares/authMiddleware.js";
import historialPDFController from "../../controllers/Pacientes/historialPDFController.js";

const historiaMedicaRoute = express.Router();

historiaMedicaRoute.post("/crear", verificarToken, historiaMedicaController.crearHistoriaMedica);
historiaMedicaRoute.get("/:pacienteId", verificarToken, historiaMedicaController.obtenerHistoriaPorPaciente);
historiaMedicaRoute.put("/:id", verificarToken, historiaMedicaController.editarHistoriaMedica);
historiaMedicaRoute.delete("/:id", verificarToken, historiaMedicaController.eliminarHistoriaMedica);

historiaMedicaRoute.get("/pdf/:pacienteId", verificarToken, historialPDFController.descargarHistoriaMedicaPDF)

export default historiaMedicaRoute;