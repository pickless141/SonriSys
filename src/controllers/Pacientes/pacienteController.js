import Paciente from "../../models/Paciente.js";

const crearPaciente = async (req, res) => {
    try {
        const { nombreCompleto, fechaNacimiento, edad, sexo, direccion, telefono, email, ocupacion, estadoCivil, responsableTutor, recomendadoPor } = req.body;

        const nuevoPaciente = new Paciente({
            nombreCompleto,
            fechaNacimiento,
            edad,
            sexo,
            direccion,
            telefono,
            email,
            ocupacion,
            estadoCivil,
            responsableTutor: responsableTutor || {},
            recomendadoPor
        });

        await nuevoPaciente.save();

        return res.status(201).json({
            mensaje: "Paciente creado exitosamente",
            paciente: nuevoPaciente
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al crear el paciente" });
    }
};

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.error(error)
        return res.status(500).json({mensaje: "Error al obtener los pacientes"})
        
    }    
}

const obtenerPaciente = async (req, res) => {
    try {
        const {id} = req.params
        const paciente = await Paciente.findById(id);

        if(!paciente) {
            return res.status(404).json({mensaje: "Paciente no encontrado"})
        }

        return res.status(200).json(paciente)
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensaje: "Error al obtener el paciente"})
    }
}

const editarPaciente = async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizados = req.body;

        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, datosActualizados, {new: true});

        if(!pacienteActualizado) {
            return res.status(404).json({mensaje: "Paciente no encontrado"});
        }

        return res.status(200).json({
            mensaje: "Paciente actualizado correctamente",
            paciente: pacienteActualizado
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({mensaje: "Error al actualizar el paciente"});
    }
}

const eliminarPaciente = async (req, res) => {
    try {
        const {id} = req.params;

        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        
        if(!pacienteEliminado) {
            return res.status(404).json({mensaje: "Paciente no encontrado"});
        }

        return res.status(200).json({mensaje: "Paciente eliminado correctamente"});
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({mensaje: "Error al eliminar el paciente"})
    }
}

const pacientesSelect = async (req, res) => {
    try {
      const pacientes = await Paciente.find({}, 'nombreCompleto');

      const pacientesBasico = pacientes.map(paciente => ({
        id: paciente._id,
        nombreCompleto: paciente.nombreCompleto
      }));
      return res.status(200).json(pacientesBasico);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al obtener los pacientes básicos" });
    }
};
  

export default {
    crearPaciente,
    obtenerPacientes,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente, 
    pacientesSelect
}