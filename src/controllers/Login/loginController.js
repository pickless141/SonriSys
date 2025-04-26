import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/Usuario.js";
import { enviarEmail } from "../../config/email.js";
import { resetPasswordTemplate } from "../../templates/email.js";

const loginUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(400).json({ mensaje: "Usuario no encontrado" });
      }
  
      if (!usuario.estado) {
        return res.status(403).json({ mensaje: "Tu cuenta fue desactivada por un administrador." });
      }
  
      if (usuario.bloqueadoHasta && new Date() < usuario.bloqueadoHasta) {
        return res.status(403).json({ mensaje: "Cuenta bloqueada por intentos fallidos. Intenta más tarde." });
      }
  
      const passwordCorrecto = await bcrypt.compare(password, usuario.password);
      if (!passwordCorrecto) {
        usuario.intentosFallidos += 1;
  
        if (usuario.intentosFallidos >= 3) {
          usuario.bloqueadoHasta = new Date(Date.now() + 30 * 60 * 1000); 
        }
  
        await usuario.save();
        return res.status(400).json({ mensaje: "Contraseña incorrecta." });
      }

      usuario.intentosFallidos = 0;
      usuario.bloqueadoHasta = null;
      await usuario.save();
  
      const token = jwt.sign(
        { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, 
      });
  
      res.json({ mensaje: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al iniciar sesión", error });
    }
  };

const getAuthenticatedUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await Usuario.findById(decoded.id).select("-password -resetCode -resetCodeExpires");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener usuario autenticado", error });
    }
};

const logoutUsuario = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict",
    });

    res.json({ mensaje: "Sesión cerrada correctamente" });
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "No existe una cuenta con ese email" });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000);

        usuario.resetCode = resetCode;
        usuario.resetCodeExpires = Date.now() + 15 * 60 * 1000;
        await usuario.save();

        const emailHTML = resetPasswordTemplate(usuario.nombre, resetCode);

        await enviarEmail(email, "Código de recuperación de contraseña", emailHTML);

        res.json({ mensaje: "Se ha enviado un código de recuperación a tu correo" });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al enviar el correo", error });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "No existe una cuenta con ese email" });
        }

        if (usuario.resetCode !== Number(resetCode) || usuario.resetCodeExpires < Date.now()) {
            return res.status(400).json({ mensaje: "Código inválido o expirado" });
        }

        const salt = await bcrypt.genSalt(12);
        usuario.password = await bcrypt.hash(newPassword, salt);

        usuario.resetCode = null;
        usuario.resetCodeExpires = null;

        await usuario.save();

        res.json({ mensaje: "Contraseña actualizada correctamente" });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al restablecer contraseña", error })
        console.log(error);
    }
};

export default {
    loginUsuario,
    logoutUsuario,
    forgotPassword,
    resetPassword,
    getAuthenticatedUser
};