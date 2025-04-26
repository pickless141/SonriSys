import mongoose from "mongoose";

const historiaMedicaSchema = new mongoose.Schema(
    {
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paciente",
            required: true
        },
        tratamientoMedicoActual: {
            enTratamiento: { type: Boolean, required: true },
            tiempo: { type: String, default: null }
        },
        usoMedicamento: {
            usaMedicamento: { type: Boolean, required: true },
            cuales: { type: String, default: null }
        },
        enfermedades: {
            tuberculosis: { type: Boolean, default: false },
            lepra: { type: Boolean, default: false },
            enfermedadesSexuales: { type: Boolean, default: false },
            hepatitis: { type: Boolean, default: false },
            sida: { type: Boolean, default: false },
            enfermedadChagas: { type: Boolean, default: false },
            fiebreReumatica: { type: Boolean, default: false },
            asma: { type: Boolean, default: false },
            sinusitis: { type: Boolean, default: false },
            alergia: { type: Boolean, default: false },
            ulceras: { type: Boolean, default: false },
            enfermedadesCardiacas: { type: Boolean, default: false },
            epilepsia: { type: Boolean, default: false },
            hipertensionArterial: { type: Boolean, default: false },
            anemia: { type: Boolean, default: false },
            hemofilia: { type: Boolean, default: false },
            disturbiosPsiquicos: { type: Boolean, default: false },
            convulsiones: { type: Boolean, default: false },
            desmayos: { type: Boolean, default: false },
            problemasCoagulacion: { type: Boolean, default: false },
            diabetes: { type: Boolean, default: false },
            otras: { type: String, default: null }
        },
        transfusionSanguinea: {
            necesitaTransfusion: { type: Boolean, required: true },
            motivo: { type: String, default: null }
        },
        cirugiasPrevias: {
            fueSometido: { type: Boolean, required: true },
            detalle: { type: String, default: null }
        },
        sangradoProlongado: { type: Boolean, required: true },
        fuma: {
            fuma: { type: Boolean, required: true },
            tiempo: { type: String, default: null }
        },
        alcohol: {
            bebeAlcohol: { type: Boolean, required: true },
            tiempo: { type: String, default: null }
        },
        embarazo: { type: Boolean, required: true },
        toleranciaAnestesia: { type: Boolean, required: true },
        testElisa: {
            seRealizo: { type: Boolean, required: true },
            tiempo: { type: String, default: null }
        },
        motivoVisita: { type: String, required: true }
    },
    { timestamps: true }
);

const HistoriaMedica = mongoose.model("HistoriaMedica", historiaMedicaSchema);

export default HistoriaMedica;