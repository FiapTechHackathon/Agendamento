import AgendamentoPaciente from "../entity/agendamentoPaciente";
import { statusAgendamento } from "../entity/enum/statusAgendamento";
import IAgendamentoPaciente from "../interfaces/IAgendamentoPaciente";
import { IDataBase } from "../interfaces/IDataBase";

class AgendamentoPacienteRepository implements IAgendamentoPaciente {
    public db: IDataBase;
    private nomeTabela = "Agendamento_Paciente";

    constructor(database: IDataBase) {
        this.db = database;
    }
    async findByIdAgenda(id: number, id_agenda: number): Promise<AgendamentoPaciente> {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "ID", valor: id },{campo:"ID_Agenda",valor: id_agenda}]);
        if (!result || result.length === 0) return null;

        const data = result[0];
        const agendamento = new AgendamentoPaciente(data.ID_Paciente, data.ID_Agenda, data.Status);
        agendamento.id = data.ID;
        return agendamento;
    }
    delete(id: any) {
        throw new Error("Method not implemented.");
    }
    findById(id: any) {
        throw new Error("Method not implemented.");
    }

    public getAll = async (): Promise<AgendamentoPaciente[]> => {
        const result = await this.db.find(this.nomeTabela,null,null);
        if (!result || result.length === 0) return null;

        return result.map(item => {
            const agendamento = new AgendamentoPaciente(item.ID_Paciente, item.ID_Agenda, item.Status);
            return agendamento;
        });
    }

    public store = async (agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente> => {
        const data = await this.db.store(this.nomeTabela, [
            { campo: "ID_Paciente", valor: agendamento.idPaciente },
            { campo: "ID_Agenda", valor: agendamento.idAgenda },
            { campo: "Status", valor: statusAgendamento.PENDENTE }
        ]);
        agendamento.id = parseInt(data.insertId);
        return agendamento;
    }

    public update = async (agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente> => {
        console.log(agendamento)
        await this.db.update(this.nomeTabela, [
            { campo: "Status", valor: agendamento.status },
            { campo: "Justificativa", valor: agendamento.Justificativa }],
            [{ campo: "ID_Agenda", valor: agendamento.idAgenda }]);
        return agendamento;
    }

    public aceitaRecusaAgendamento = async (agendamento: AgendamentoPaciente): Promise<AgendamentoPaciente> => {
        console.log(agendamento)
        await this.db.update(this.nomeTabela, [
            { campo: "Status", valor: agendamento.status }],
            [{ campo: "ID_Agenda", valor: agendamento.idAgenda }]);
        return agendamento;
    }

}

export default AgendamentoPacienteRepository;
