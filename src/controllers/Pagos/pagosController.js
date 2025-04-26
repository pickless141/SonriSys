import Tratamiento from "../../models/Tratamientos.js";

const obtenerPagoDetalles = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.find()
            .populate("paciente", "nombreCompleto") 
            .select("paciente dientesTratados");

        if (tratamientos.length === 0) {
            return res.status(200).json({ message: "No se encontraron tratamientos registrados" });
        }

        res.status(200).json(tratamientos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalles de pago" });
    }
};

const actualizarEstadoCosto = async (req, res) => {
    try {
        const { tratamientoId, dienteId } = req.params;
        const { estadoCosto } = req.body;

        const estadosValidos = ["PENDIENTE", "PAGADO", "CANCELADO"];
        if (!estadosValidos.includes(estadoCosto)) {
            return res.status(400).json({
                message: "Estado de costo inválido. Los estados válidos son: PENDIENTE, PAGADO, CANCELADO"
            });
        }

        const tratamiento = await Tratamiento.findById(tratamientoId);
        if (!tratamiento) {
            return res.status(404).json({ message: "Tratamiento no encontrado" });
        }

        const dienteTratado = tratamiento.dientesTratados.id(dienteId);
        if (!dienteTratado) {
            return res.status(404).json({ message: "Diente tratado no encontrado" });
        }

        if (estadoCosto === "PAGADO" && dienteTratado.estadoCosto !== "PAGADO") {
            tratamiento.totalPagado += dienteTratado.costo;
            tratamiento.costoTotal -= dienteTratado.costo;
            dienteTratado.fechaPago = new Date(); 
        }

        dienteTratado.estadoCosto = estadoCosto;
        await tratamiento.save();

        const tratamientoActualizado = await Tratamiento.findById(tratamientoId)
            .populate("paciente", "nombreCompleto")
            .select("paciente dientesTratados");

        res.status(200).json({
            message: "Estado del costo actualizado correctamente",
            tratamiento: tratamientoActualizado
        });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el estado del costo" });
    }
};

export default {
    obtenerPagoDetalles,
    actualizarEstadoCosto,
};