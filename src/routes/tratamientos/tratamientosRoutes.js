import express from 'express';
import { body } from 'express-validator';
import tratamientosController from '../../controllers/Tratamientos/tratamientosController.js';
import validarCampos from '../../middlewares/validarCampos.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const tratamientosRoutes = express.Router();


tratamientosRoutes.post(
  '/',
  verificarToken,
  [
    body('paciente').notEmpty().withMessage('El ID del paciente es obligatorio'),
    body('fechaInicio').optional().isISO8601().withMessage('La fecha debe ser válida en formato YYYY-MM-DD'),
    body('dientesTratados').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un diente tratado'),
    body('dientesTratados.*.numero').isNumeric().withMessage('El número del diente debe ser numérico'),
    body('dientesTratados.*.descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('dientesTratados.*.costo').isNumeric().withMessage('El costo debe ser numérico'),
    validarCampos
  ],
  tratamientosController.crearTratamiento
);

tratamientosRoutes.get('/', verificarToken, tratamientosController.obtenerTratamientos)
tratamientosRoutes.get('/paciente/:pacienteId', verificarToken, tratamientosController.obtenerTratamientosPorPaciente);
tratamientosRoutes.get('/:tratamientoId', verificarToken, tratamientosController.obtenerTratamientoPorId);

tratamientosRoutes.put(
  "/:tratamientoId",
  verificarToken,
  [
    body("paciente").optional().isMongoId().withMessage("ID de paciente inválido"),
    body("fechaInicio").optional().isISO8601().withMessage("Fecha inválida"),
    body("dientesTratados").optional().isArray().withMessage("Debe ser un array de dientes"),
    validarCampos
  ],
  tratamientosController.actualizarTratamiento
);

tratamientosRoutes.patch(
    '/:tratamientoId/estado',
    verificarToken,
    [
      body('estado').isIn(['PENDIENTE', 'EN CURSO', 'FINALIZADO']).withMessage('Estado inválido'),
      validarCampos
    ],
    tratamientosController.actualizarEstadoTratamiento
);

tratamientosRoutes.delete("/:id", verificarToken, tratamientosController.eliminarTratamiento)

export default tratamientosRoutes;