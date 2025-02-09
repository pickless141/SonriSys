import mongoose from "mongoose";
import validator from 'validator';

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Por favor, ingresa un email valido"],
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
        },
        rol: {
            type: String,
            enum: ["admin", "usuario"],
            default: "usuario",
        },
        estado: {
            type: Boolean,
            default: true
        },
        intentosFallidos: {
            type: Number,
            default: 0,
        },
        bloqueadoHasta: {
            type: Date,
        },
        resetCode: {
            type: Number,
            required: false,
        },
        resetCodeExpires: {
            type: Date,
            required: false,
        }
    },
    {timestamps: true}
)

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;