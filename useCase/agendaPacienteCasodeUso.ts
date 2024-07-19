import BadRequestError from '../application/exception/BadRequestError';
import AgendamentoPaciente from '../entity/agendamentoPaciente';
import IAgendamentoPaciente from '../interfaces/IAgendamentoPaciente';

export class AgendamentoPacienteCasoDeUso {

    static async getAllAgendamentosPaciente(agendamentoRepository: IAgendamentoPaciente){
        const agendamentos = await agendamentoRepository.getAll();
        return agendamentos;
    }

    static async criarAgendamentoPaciente(agendamento: AgendamentoPaciente, agendamentoRepository: IAgendamentoPaciente) {
        return await agendamentoRepository.store(agendamento);
    }

    static async atualizarAgendamentoPaciente(agendamento: AgendamentoPaciente, agendamentoRepository: IAgendamentoPaciente) {
        let dataAgendamento = await agendamentoRepository.findByIdAgenda(agendamento.idPaciente, agendamento.idAgenda);

        if (dataAgendamento == null) {
            throw new BadRequestError("Agendamento não encontrado.");
        }

        agendamento = await agendamentoRepository.update(agendamento);
        return agendamento;
    }
    static async atualizarStatusAgendamentoPaciente(agendamento: AgendamentoPaciente, agendamentoRepository: IAgendamentoPaciente) {
        let dataAgendamento = await agendamentoRepository.findByIdAgenda(agendamento.idPaciente, agendamento.idAgenda);

        if (dataAgendamento == null) {
            throw new BadRequestError("Agendamento não encontrado.");
        }

        agendamento = await agendamentoRepository.aceitaRecusaAgendamento(agendamento);
        return agendamento;
    }

    // static async encontrarAgendamentoPacientePorId(idPaciente: number, idAgenda: number, agendamentoRepository: IAgendamentoPaciente) {
    //     return await agendamentoRepository.findById(idPaciente, idAgenda);
    // }

    // static async deleteAgendamentoPaciente(idPaciente: number, idAgenda: number, agendamentoRepository: IAgendamentoPaciente) {
    //     return await agendamentoRepository.delete(idPaciente, idAgenda);
    // }
}
