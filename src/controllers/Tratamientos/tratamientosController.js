import Tratamiento, {DIENTES} from '../../models/Tratamientos.js';
import Paciente from '../../models/Paciente.js';

const crearTratamiento = async (req, res) => {
  try {
    const { paciente, fechaInicio, dientesTratados } = req.body;

    const pacienteExistente = await Paciente.findById(paciente);
    if (!pacienteExistente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    const costoTotal = dientesTratados.reduce((total, diente) => total + diente.costo, 0);

    const nuevoTratamiento = new Tratamiento({
      paciente,
      fechaInicio,
      dientesTratados,
      costoTotal
    });

    await nuevoTratamiento.save();

    res.status(201).json({
      message: 'Tratamiento creado con éxito',
      tratamiento: nuevoTratamiento
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tratamiento', detalle: error.message });
  }
};

const obtenerTratamientos = async (req, res) => {
    try {
      const tratamientos = await Tratamiento.find().populate('paciente').lean();
  
      const tratamientosConTipo = tratamientos.map(tratamiento => {
        const dientesConTipo = tratamiento.dientesTratados.map(diente => {
          let tipo = 'Desconocido';
          
          if (DIENTES.molares.includes(diente.numero)) tipo = 'Molares';
          else if (DIENTES.premolares.includes(diente.numero)) tipo = 'Premolares';
          else if (DIENTES.caninos.includes(diente.numero)) tipo = 'Caninos';
          else if (DIENTES.incisivos.includes(diente.numero)) tipo = 'Incisivos';
  
          return { ...diente, tipo };
        });
  
        return { ...tratamiento, dientesTratados: dientesConTipo };
      });
  
      res.status(200).json(tratamientosConTipo);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener tratamientos', detalle: error.message });
    }
};

const obtenerTratamientosPorPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const tratamientos = await Tratamiento.find({ paciente: pacienteId }).populate('paciente');

    res.status(200).json(tratamientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tratamientos', detalle: error.message });
  }
};

const obtenerTratamientoPorId = async (req, res) => {
  try {
    const { tratamientoId } = req.params;

    const tratamiento = await Tratamiento.findById(tratamientoId).populate('paciente');

    if (!tratamiento) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' });
    }

    res.status(200).json(tratamiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tratamiento', detalle: error.message });
  }
};

const actualizarEstadoTratamiento = async (req, res) => {
    try {
      const { tratamientoId } = req.params;
      const { estado } = req.body;
  
      if (!['PENDIENTE', 'EN CURSO', 'FINALIZADO'].includes(estado)) {
        return res.status(400).json({ message: 'Estado inválido' });
      }
  
      const tratamientoActualizado = await Tratamiento.findByIdAndUpdate(
        tratamientoId,
        { estado },
        { new: true }
      ).populate('paciente'); 
  
      if (!tratamientoActualizado) {
        return res.status(404).json({ message: 'Tratamiento no encontrado' });
      }
  
      res.status(200).json({
        message: 'Estado del tratamiento actualizado con éxito',
        tratamiento: tratamientoActualizado
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar tratamiento', detalle: error.message });
    }
};


const actualizarTratamiento = async (req, res) => {
    try {
      const { tratamientoId } = req.params;
      const { paciente, fechaInicio, dientesTratados } = req.body;
  
      const tratamientoExistente = await Tratamiento.findById(tratamientoId);
      if (!tratamientoExistente) {
        return res.status(404).json({ message: "Tratamiento no encontrado" });
      }
  
      if (paciente) {
        const pacienteExistente = await Paciente.findById(paciente);
        if (!pacienteExistente) {
          return res.status(404).json({ message: "Paciente no encontrado" });
        }
      }
  
      let costoTotal = tratamientoExistente.costoTotal;
      let nuevosDientesTratados = tratamientoExistente.dientesTratados;
  
      if (dientesTratados) {
        costoTotal = dientesTratados.reduce((suma, diente) => suma + diente.costo, 0);
        nuevosDientesTratados = dientesTratados;
      }
  
      let tratamientoActualizado = await Tratamiento.findByIdAndUpdate(
        tratamientoId,
        {
          ...(paciente && { paciente }),
          ...(fechaInicio && { fechaInicio }),
          ...(dientesTratados && { dientesTratados: nuevosDientesTratados }),
          costoTotal
        },
        { new: true }
      ).populate("paciente") 
        .lean();
  
      if (tratamientoActualizado) {
        const dientesConTipo = tratamientoActualizado.dientesTratados.map((diente) => {
          let tipo = 'Desconocido';
  
          if (DIENTES.molares.includes(diente.numero)) tipo = 'Molares';
          else if (DIENTES.premolares.includes(diente.numero)) tipo = 'Premolares';
          else if (DIENTES.caninos.includes(diente.numero)) tipo = 'Caninos';
          else if (DIENTES.incisivos.includes(diente.numero)) tipo = 'Incisivos';
  
          return { ...diente, tipo };
        });
  
        tratamientoActualizado.dientesTratados = dientesConTipo;
      }
  
      res.status(200).json({
        message: "Tratamiento actualizado con éxito",
        tratamiento: tratamientoActualizado
      });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar tratamiento", detalle: error.message });
    }
};

const eliminarTratamiento = async (req, res) => {
  try {
    const { id } = req.params;

    const tratamientoEliminado = await Tratamiento.findByIdAndDelete(id);

    if (!tratamientoEliminado) {
      return res.status(404).json({ mensaje: "Tratamiento no encontrado" });
    }

    return res
      .status(200)
      .json({ mensaje: "Tratamiento eliminado correctamente" });
  } catch (error) {}
  console.error(error);
  return res.status(500).json({ mensaje: "Error al eliminar el tratamiento" });
};


export default {
    crearTratamiento,
    obtenerTratamientos,
    obtenerTratamientosPorPaciente,
    obtenerTratamientoPorId,
    actualizarEstadoTratamiento,
    actualizarTratamiento,
    eliminarTratamiento
}