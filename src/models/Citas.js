import mongoose, { Types } from "mongoose";

const citaSchema = new mongoose.Schema(
    {
        paciente: {type: Types.ObjectId, ref: 'Paciente', required: true},
        fechaProgramada: {type: Date},
        estadoCita: {
            type: String,
            enum: ['PENDIENTE', 'RE-AGENDADO', 'COMPLETADO', 'CANCELADO'],
            default: 'PENDIENTE'
        }
    }
)

const Cita = mongoose.model('Cita', citaSchema);

export default Cita;