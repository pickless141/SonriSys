import express from 'express';
import citasController from '../../controllers/Citas/citasController.js';
import validarCampos from '../../middlewares/validarCampos.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const citasRoutes = express.Router()

citasRoutes.post('/', verificarToken, citasController.crearCita);
citasRoutes.get('/', verificarToken, citasController.obtenerCitas);
citasRoutes.patch('/:id', verificarToken, citasController.actualizarCita);
citasRoutes.patch('/:id/estado', verificarToken, citasController.patchEstadoCita);

citasRoutes.delete('/:id', verificarToken, citasController.eliminarCita);

export default citasRoutes