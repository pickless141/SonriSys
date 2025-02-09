import express from "express";
import loginController from "../../controllers/Login/loginController.js";
import { body } from "express-validator";
import validarCampos from "../../middlewares/validarCampos.js";

const authRoute = express.Router();

authRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ser un email válido"),
    validarCampos,
  ],
  loginController.loginUsuario
);

authRoute.post("/logout", loginController.logoutUsuario);

authRoute.post(
    "/forgot-password",
    [
      body("token").notEmpty().withMessage("El token es obligatorio"),
    ],
    loginController.forgotPassword
);

authRoute.post(
    "/reset-password",
    [
      body("email").isEmail().withMessage("Debe ser un email válido"),
      body("resetCode").isNumeric().withMessage("El código de recuperación es obligatorio y debe ser un número"),
      body("newPassword")
        .isLength({ min: 6 })
        .withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
      validarCampos,
    ],
    loginController.resetPassword
);

export default authRoute;