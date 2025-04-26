import mongoose from "mongoose";
import validator from 'validator';

const pacienteSchema = new mongoose.Schema(
    {
        nombreCompleto: {
            type: String,
            required: [true, 'El nombre completo es obligatorio'],
            trim: true
        },
        fechaNacimiento: {
            type: Date,
            required: [true, 'La fecha de nacimiento es obligatoria']
        },
        edad: {
            type: Number,
            required: true,
            min: [0, 'La edad no puede ser negativa']
        },
        sexo: {
            type: String,
            enum: ["Masculino", "Femenino"],
        },
        direccion: {
            type: String,
            trim: true
        },
        telefono: {
            type: String,
            trim: true,
            default: null, 
            validate: {
                validator: function (v) {
                    return v === null || v === "" || validator.isMobilePhone(v, 'any', { strictMode: false });
                },
                message: "Por favor, ingresa un número de teléfono válido"
            }
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            sparse: true,
            default: null,
        },
        ocupacion: {
            type: String,
            trim: true
        },
        estadoCivil: {
            type: String,
            enum: ["Soltero", "Casado", "Divorciado", "Viudo", "Unión libre", "Otro"],
        },
        responsableTutor: {
            nombre: {
                type: String,
                trim: true,
                default: null 
            }
        },
        recomendadoPor: {
            type: String,
            trim: true,
            default: null 
        }
    },
    { timestamps: true }
);

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;