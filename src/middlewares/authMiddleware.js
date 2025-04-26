import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const verificarToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado, se requiere un token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findById(decoded.id).select("-password");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!usuario.estado) {
      return res.status(403).json({ mensaje: "Tu cuenta ha sido desactivada por un administrador" });
    }

    req.usuario = usuario; 
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

export default verificarToken;