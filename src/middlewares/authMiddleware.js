import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado, se requiere un token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

export default verificarToken;