import BadRequestError from '../application/exception/BadRequestError';
import Usuario from '../entity/usuario';
import Medico from '../entity/medico';
import Paciente from '../entity/paciente';
import IPaciente from '../interfaces/IPaciente';
import IUsuario from '../interfaces/IRepository';
import IMedico from '../interfaces/IMedico';

export class UsuarioCasoDeUso {

    // static async getAllUsuario(params, pacienteRepository: IUsuario){
    //     const pacientes = await pacienteRepository.getAll();
    //     return pacientes;
    // }
    
    static async criarUsuarioMedico(usuario: Usuario,medico: Medico, medicoRepository:IMedico, usuarioRepository:IUsuario) {
        let crm = await medicoRepository.findByCRM(parseInt(medico.crm));
        console.log(crm);
        console.log(medico);
        if (crm != null) {
            throw new BadRequestError("CRM já cadastrado.");
        }
        return await usuarioRepository.store(usuario);
    }
    static async criarUsuarioPaciente(usuario: Usuario,paciente: Paciente, pacienteRepository:IPaciente, usuarioRepository:IUsuario) {
        let cpf = await pacienteRepository.findByCPF(paciente.cpf);
 
        if (cpf != null) {
            throw new BadRequestError("CPF já cadastrado.");
        }
        return await usuarioRepository.store(usuario);
    }

    // static async deleteUsuario(id: number, pacienteRepository: IUsuario) {
    //     return await pacienteRepository.delete(id);
    // }
}
