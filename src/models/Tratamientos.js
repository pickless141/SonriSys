import { Schema, model, Types } from 'mongoose';

export const DIENTES = {
  molares: [16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 47, 48],
  premolares: [14, 15, 24, 25, 34, 35, 44, 45],
  caninos: [13, 23, 33, 43],
  incisivos: [11, 12, 21, 22, 31, 32, 41, 42]
};

const DienteTratamientoSchema = new Schema({
  numero: { type: Number, required: true },
  descripcion: { type: String, required: true },
  costo: { type: Number, required: true },
  estadoCosto: {
    type: String,
    enum: ["PENDIENTE", "PAGADO", "CANCELADO"],
    default: "PENDIENTE"
  },
  fechaPago: { type: Date } 
});

const TratamientoSchema = new Schema({
  paciente: { type: Types.ObjectId, ref: 'Paciente', required: true },
  fechaInicio: { type: Date, default: Date.now, required: true },
  dientesTratados: [DienteTratamientoSchema],
  costoTotal: { type: Number, default: 0 },
  totalPagado: { type: Number, default: 0 },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'EN CURSO', 'FINALIZADO'],
    default: 'PENDIENTE',
  }
});

export default model('Tratamiento', TratamientoSchema);