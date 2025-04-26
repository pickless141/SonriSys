import HistoriaMedica from "../../models/HistoriaMedica.js";

const crearHistoriaMedica = async (req, res) => {
    try {
        const { paciente, ...historiaData } = req.body;

        const nuevaHistoria = new HistoriaMedica({ paciente, ...historiaData });
        await nuevaHistoria.save();

        return res.status(201).json({
            mensaje: "Historia médica creada exitosamente",
            historiaMedica: nuevaHistoria
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al crear la historia médica" });
    }
};

const obtenerHistoriaPorPaciente = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const historia = await HistoriaMedica.findOne({ paciente: pacienteId });

        if (!historia) {
            return res.status(404).json({ mensaje: "No se encontró historial médico para este paciente" });
        }

        return res.status(200).json(historia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al obtener la historia médica" });
    }
};

const editarHistoriaMedica = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const historiaActualizada = await HistoriaMedica.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!historiaActualizada) {
            return res.status(404).json({ mensaje: "Historia médica no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Historia médica actualizada correctamente",
            historiaMedica: historiaActualizada
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar la historia médica" });
    }
};

const eliminarHistoriaMedica = async (req, res) => {
    try {
        const { id } = req.params;

        const historiaEliminada = await HistoriaMedica.findByIdAndDelete(id);

        if (!historiaEliminada) {
            return res.status(404).json({ mensaje: "Historia médica no encontrada" });
        }

        return res.status(200).json({ mensaje: "Historia médica eliminada correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al eliminar la historia médica" });
    }
};

export default {
    crearHistoriaMedica,
    obtenerHistoriaPorPaciente,
    editarHistoriaMedica,
    eliminarHistoriaMedica
};