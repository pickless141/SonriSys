import Cita from "../../models/Citas.js";
import Paciente from "../../models/Paciente.js";

const crearCita = async (req, res) => {
    try {
        const { paciente, fechaProgramada } = req.body;

        const pacienteExistente = await Paciente.findById(paciente);
        if (!pacienteExistente) {
          return res.status(404).json({ message: "Paciente no encontrado" });
        }

        const citaProgramada = new Cita({
            paciente,
            fechaProgramada
        })
        await citaProgramada.save()

        res.status(201).json({
            message: "Cita programada con exito",
            cita: citaProgramada
        })
    } catch (error) { 
        res.status(500).json({error: "Error al crear un cita"})
    }
}

const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find().populate('paciente', 'nombreCompleto');
        if (citas.length === 0) {
            return res.status(200).json({ message: "No hay citas registradas" });
        }
        
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({error: "Error al obtener las citas"})
    }
}

const actualizarCita = async (req, res) => {
    try {
      const { id } = req.params;
      const { fechaProgramada} = req.body;

      const citaActualizada = await Cita.findByIdAndUpdate(
        id,
        { fechaProgramada },
        { new: true }
      ).populate('paciente', 'nombreCompleto');
  
      if (!citaActualizada) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
  
      res.status(200).json({
        message: "Cita actualizada correctamente",
        cita: citaActualizada
      });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cita" });
    }
};

const patchEstadoCita = async (req, res) => {
    try {
        const {id} = req.params;
        const {estadoCita} = req.body;

        const citaActualizada = await Cita.findByIdAndUpdate(
            id,
            {estadoCita},
            {new: true}
        ).populate('paciente', 'nombreCompleto');

        if(!citaActualizada) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        res.status(200).json({
            message: "Estado de la cita actualizado correctamente",
            cita: citaActualizada
        });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el estado de la cita" }); 
    }
}

const eliminarCita = async (req, res) => {
    try {
        const { id } = req.params

        const citaEliminada = await Cita.findByIdAndDelete(id)
        if (!citaEliminada) {
            return res.status(404).json({ mensaje: "Cita no encontrada" });
        }

        return res
          .status(200)
          .json({ mensaje: "Cita eliminada correctamente" });
    } catch (error) {
        res.status(500).json({error: "Error al eliminar la cita"})
    }
}

export default {
    crearCita,
    obtenerCitas,
    actualizarCita,
    patchEstadoCita,
    eliminarCita
}
