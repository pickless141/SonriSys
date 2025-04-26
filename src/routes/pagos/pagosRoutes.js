import express from 'express';
import pagosController from '../../controllers/Pagos/pagosController.js'
import verificarToken from '../../middlewares/authMiddleware.js';

const pagosRoutes = express.Router();

pagosRoutes.get('/', verificarToken, pagosController.obtenerPagoDetalles);

pagosRoutes.patch('/:tratamientoId/diente/:dienteId', verificarToken, pagosController.actualizarEstadoCosto);

export default pagosRoutes;