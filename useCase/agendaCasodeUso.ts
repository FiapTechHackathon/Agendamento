import BadRequestError from '../application/exception/BadRequestError';
import Agenda from '../entity/agenda';
import IAgenda from '../interfaces/IAgenda';

export class AgendaCasoDeUso {

    static async getAllAgendasDiponiveis(agendaRepository: IAgenda){
        const agendas = await agendaRepository.getAll();
        return agendas;
    }

    static async criarAgenda(agenda: Agenda, agendaRepository: IAgenda) {
        return await agendaRepository.store(agenda);
    }

    static async atualizarAgenda(agenda: Agenda, id: number, agendaRepository: IAgenda) {
        let dataAgenda = await agendaRepository.findById(id);

        if (dataAgenda == null) {
            throw new BadRequestError("Agenda não encontrada.");
        }

        agenda = await agendaRepository.update(agenda, id);
        return agenda;
    }

    static async encontrarAgendaPorIdMedico(id: number, agendaRepository: IAgenda) {
        return await agendaRepository.findById(id);
    }

    static async deleteAgenda(id: number, agendaRepository: IAgenda) {
        return await agendaRepository.delete(id);
    }
}
