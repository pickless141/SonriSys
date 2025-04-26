import express from "express";
import usuarioController from "../../controllers/Usuarios/usuarioController.js";
import { body } from "express-validator";
import validarCampos from "../../middlewares/validarCampos.js";
import verificarToken from "../../middlewares/authMiddleware.js";

const usuarioRoute = express.Router();

usuarioRoute.post(
    "/register",
    [
        body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
        body("email").isEmail().withMessage("Debe ser un email válido"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("La contraseña debe tener al menos 6 caracteres"),
        validarCampos, 
      ],
      usuarioController.crearUsuario
);

usuarioRoute.get("/perfil", verificarToken, (req, res) => {
    res.json({mensaje: "Acceso Autorizado", usuario: req.usuario})
})

usuarioRoute.get("/", verificarToken, usuarioController.obtenerUsuarios);

usuarioRoute.put("/:id", verificarToken, usuarioController.actualizarUsuario);

usuarioRoute.patch("/:id/reset", verificarToken, usuarioController.resetearIntentos);

usuarioRoute.patch("/:id/estado", verificarToken, usuarioController.bloquearUsuario);

usuarioRoute.delete("/:id", verificarToken, usuarioController.eliminarUsuario);

export default usuarioRoute