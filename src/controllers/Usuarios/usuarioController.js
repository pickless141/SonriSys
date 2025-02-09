import Usuario from "../../models/Usuario.js";
import bcrypt from "bcryptjs";


const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};

export default {
  crearUsuario,
};