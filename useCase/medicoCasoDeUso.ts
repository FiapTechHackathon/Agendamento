import BadRequestError from '../application/exception/BadRequestError';
import Medico from '../entity/medico';
import IMedico from '../interfaces/IMedico';
import IUsuario from '../interfaces/IUsuario';

export class MedicoCasoDeUso {

    static async getAllMedicos(params, medicoRepository: IMedico){
        const medicos = await medicoRepository.getAll();
        return medicos;
    }

    static async criarMedico(medico: Medico, medicoRepository: IMedico) {
        let crm = await medicoRepository.findById(parseInt(medico.crm,10));
        if (crm != null) {
            throw new BadRequestError("CRM já cadastrado.");
        }
        return await medicoRepository.store(medico);
    }
    static async autenticarMedico(crm: number,senha:string, usuarioRepository:IUsuario ,medicoRepository: IMedico) {
        
        let medico = await medicoRepository.findByCRM(crm);
        console.log(medico);
        if (medico === null) {
            throw new BadRequestError("CRM não cadastrado.");
        }
        let usuario= await usuarioRepository.findBySenha(medico.idUsuario,senha);
        if (usuario === null) {
            throw new BadRequestError("senha incorreta.");
        }
        return  usuario;
    }

    static async atualizarMedico(medico: Medico, id: number, medicoRepository: IMedico) {
        let dataMedico = await medicoRepository.findById(id);

        if (dataMedico == null) {
            throw new BadRequestError("Médico não encontrado.");
        }

        medico = await medicoRepository.update(medico, id);
        return medico;
    }

    static async encontrarMedicoPorId(id: number, medicoRepository: IMedico) {
        return await medicoRepository.findById(id);
    }

    static async deleteMedico(id: number, medicoRepository: IMedico) {
        return await medicoRepository.delete(id);
    }
}
