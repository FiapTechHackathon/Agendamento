import AgendamentoPaciente from "../entity/agendamentoPaciente";
import IRepository from "./IRepository";

interface IAgendamentoPaciente extends IRepository {
    getAll(): Promise<AgendamentoPaciente[]>;
    findByIdAgenda(id: number,id_agenda:number): Promise<AgendamentoPaciente>;
    store(agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente>;
    update(agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente>;
    aceitaRecusaAgendamento(agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente>;
}

export default IAgendamentoPaciente;
