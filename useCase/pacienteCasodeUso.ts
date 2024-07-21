import BadRequestError from '../application/exception/BadRequestError';
import Paciente from '../entity/paciente';
import IPaciente from '../interfaces/IPaciente';
import IRepository from '../interfaces/IRepository';
import IUsuario from '../interfaces/IUsuario';

export class PacienteCasoDeUso {

    static async getAllPacientes(request, pacienteRepository: IPaciente){
        const pacientes = await pacienteRepository.getAll(request);
        return pacientes;
    }

    static async criarPaciente(paciente: Paciente, pacienteRepository: IPaciente) {

        let cpf = await pacienteRepository.findByCPF(paciente.cpf);

        let email = await pacienteRepository.findByEmail(paciente.email);

        if (email != null) {
            throw new BadRequestError("E-mail já cadastrado.");
        } else if (cpf != null) {
            throw new BadRequestError("CPF já cadastrado.");
        }
        return await pacienteRepository.store(paciente);
    }

    static async atualizarPaciente(paciente: Paciente, id: number, pacienteRepository: IPaciente) {
        let dataPaciente = await pacienteRepository.findById(id);

        if (dataPaciente == null) {
            throw new BadRequestError("Paciente não encontrado.");
        }

        paciente = await pacienteRepository.update(paciente, id);
        return paciente;
    }

    static async encontrarPacientePorId(id: number, pacienteRepository: IPaciente) {
        return await pacienteRepository.findById(id);
    }
    

    static async encontrarPacientePorCPF(cpf: string, pacienteRepository: IPaciente) {
        return await pacienteRepository.findByCPF(cpf);
    }
    static async autenticarPaciente(cpf: string,senha:string, usuarioRepository:IUsuario ,pacienteRepository: IPaciente) {
        
        let paciente = await pacienteRepository.findByCPF(cpf);

        if (paciente === null) {
            throw new BadRequestError("CPF não cadastrado.");
        }
        let usuario= await usuarioRepository.findBySenha(paciente.idUsuario,senha);
        if (usuario === null) {
            throw new BadRequestError("senha incorreta.");
        }
        return  usuario;
    }
        

    static async deletePaciente(id: number, pacienteRepository: IPaciente) {
        return await pacienteRepository.delete(id);
    }
}
