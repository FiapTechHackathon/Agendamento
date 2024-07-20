import { format } from 'date-fns';
import Agenda from "../entity/agenda";
import IAgenda from "../interfaces/IAgenda";
import { IDataBase } from "../interfaces/IDataBase";

class AgendaRepository implements IAgenda {
    public db: IDataBase;
    private nomeTabela = "Agenda";

    constructor(database: IDataBase) {
        this.db = database;
    }

    public getAll = async (): Promise<Agenda[]> => {
        const result = await this.db.find(this.nomeTabela,null, [{ campo: "Disponivel", valor: "Disponivel" }]);
        if (!result || result.length === 0) return null;

        return result.map(data => {
            const agenda = new Agenda(new Date(data.Data), data.HoraInicio, data.HoraFim, data.Disponivel, data.ID_Medico, data.Valor);
            agenda.id = data.ID;
            return agenda;
        });
    }

    public findById = async (id: number): Promise<Agenda> => {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "ID_Medico", valor: id }]);
        if (!result || result.length === 0) return null;

        const data = result[0];
        const agenda = new Agenda(new Date(data.Data), data.HoraInicio, data.HoraFim, data.Disponivel, data.ID_Medico);
        agenda.id = data.ID;
        return agenda;
    }

    public store = async (agenda: Agenda): Promise<Agenda> => {

        const formattedData = format(new Date(agenda.data), 'yyyy-MM-dd');
        const formattedHoraInicio = format(new Date(`1970-01-01T${agenda.horaInicio}`), 'HH:mm:ss');
        const formattedHoraFim = format(new Date(`1970-01-01T${agenda.horaFim}`), 'HH:mm:ss');
        
        const data = await this.db.store(this.nomeTabela, [
            { campo: "data", valor: formattedData },
            { campo: "horaInicio", valor: formattedHoraInicio },
            { campo: "horaFim", valor: formattedHoraFim},
            { campo: "disponivel", valor: agenda.disponivel },
            { campo: "ID_Medico", valor: agenda.idMedico },
            { campo: "Valor", valor: agenda.Valor }
        ]);
        agenda.id = parseInt(data.insertId);
        return agenda;
    }

    public update = async (agenda: Agenda, id: number): Promise<Agenda> => {
        await this.db.update(this.nomeTabela, [
            { campo: "Data", valor: agenda.data },
            { campo: "HoraInicio", valor: agenda.horaInicio },
            { campo: "horaFim", valor: agenda.horaFim },
            { campo: "disponivel", valor: agenda.disponivel },
            { campo: "ID_Medico", valor: agenda.idMedico },
            { campo: "Valor", valor: agenda.Valor }
        ], [{ campo: "id", valor: id }]);
        agenda.id = id;
        return agenda;
    }

    public delete = async (id: number): Promise<boolean> => {
        const result = await this.db.delete(this.nomeTabela, [{ campo: "id", valor: id }]);
        return result ? true : false;
    }
}

export default AgendaRepository;
