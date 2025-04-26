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

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, rol, estado } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (nombre) usuario.nombre = nombre;
    if (rol) usuario.rol = rol;
    if (typeof estado === "boolean") usuario.estado = estado;

    await usuario.save();
    res.status(200).json({ mensaje: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar usuario", error });
  }
};

const resetearIntentos = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.intentosFallidos = 0;
    usuario.bloqueadoHasta = null;

    await usuario.save();
    res.status(200).json({ mensaje: "Intentos fallidos reiniciados", usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al resetear intentos", error });
  }
};

const bloquearUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (typeof estado !== "boolean") {
      return res.status(400).json({ mensaje: "El campo 'estado' debe ser booleano" });
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.estado = estado;
    await usuario.save();

    res.status(200).json({ mensaje: `Usuario ${estado ? "activado" : "desactivado"} correctamente`, usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado del usuario", error });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario", error });
  }
};

export default {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  resetearIntentos,
  bloquearUsuario,
  eliminarUsuario
};