import express from 'express';
import pacienteController from '../../controllers/Pacientes/pacienteController.js';
import { body } from 'express-validator';
import validarCampos from '../../middlewares/validarCampos.js';
import verificarToken from '../../middlewares/authMiddleware.js'; 


const pacienteRoute = express.Router();

pacienteRoute.post(
    "/crear-paciente",
    [
        verificarToken, 
        body("nombreCompleto").notEmpty().withMessage("El nombre completo es obligatorio"),
        body("fechaNacimiento").isISO8601().withMessage("Debe ser una fecha válida en formato YYYY-MM-DD"),
        body("edad").isInt({ min: 0 }).withMessage("La edad debe ser un número entero positivo"),
        body("sexo").isIn(["Masculino", "Femenino"]).withMessage("El sexo debe ser 'Masculino' o 'Femenino'"),
        body("direccion").notEmpty().withMessage("La dirección es obligatoria"),
        body("ocupacion").notEmpty().withMessage("La ocupación es obligatoria"),
        body("estadoCivil").isIn(["Soltero", "Casado", "Divorciado", "Viudo", "Unión libre", "Otro"]).withMessage("Estado civil no válido"),
        validarCampos 
    ],
    pacienteController.crearPaciente
);
pacienteRoute.get("/pacientes-select", verificarToken, pacienteController.pacientesSelect);

pacienteRoute.get("/", verificarToken, pacienteController.obtenerPacientes);

pacienteRoute.get("/:id", verificarToken, pacienteController.obtenerPaciente);

pacienteRoute.put("/:id", verificarToken, pacienteController.editarPaciente);


export default pacienteRoute;