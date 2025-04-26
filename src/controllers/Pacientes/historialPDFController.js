import HistoriaMedica from "../../models/HistoriaMedica.js";
import historialMedicoPDF from "../../helpers/pdfGenerator.js";

const descargarHistoriaMedicaPDF = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    const historia = await HistoriaMedica.findOne({ paciente: pacienteId })
      .populate("paciente")
      .exec();

    if (!historia) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró historial médico para este paciente" });
    }

    historialMedicoPDF(historia, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Error al generar el PDF de la historia médica" });
  }
};

export default {
  descargarHistoriaMedicaPDF,
};
