import Medico from "../entity/medico";
import IMedico from "../interfaces/IMedico";
import { IDataBase } from "../interfaces/IDataBase";

class MedicoRepository implements IMedico {
    public db: IDataBase;
    private nomeTabela = "Medico";

    constructor(database: IDataBase) {
        this.db = database;
    }

    public getAll = async (): Promise<Medico[]> => {
        const result = await this.db.find(this.nomeTabela,null,null);
        if (!result || result.length === 0) return null;

        return result.map(data => {
            const medico = new Medico(data.Nome, data.CRM, data.Especialidade,data.Estado_CRM, data.ID_Usuario);
            medico.id = data.id;
            return medico;
        });
    }

    public findById = async (id: number): Promise<Medico> => {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "id", valor: id }]);
        if (!result || result.length === 0) return null;

        const data = result[0];
        const medico = new Medico(data.Nome, data.CRM, data.Especialidade,data.Estado_CRM, data.ID_Usuario);
        medico.id = data.id;
        return medico;
    }
    public findByCRM = async (crm: number): Promise<Medico> => {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "crm", valor: crm }]);
        if (!result || result.length === 0) return null;

        const data = result[0];
        const medico = new Medico(data.Nome, data.CRM, data.Especialidade,data.Estado_CRM, data.ID_Usuario);
        medico.id = data.id;
        return medico;
    }

    public store = async (medico: Medico): Promise<Medico> => {
        const data = await this.db.store(this.nomeTabela, [
            { campo: "crm", valor: medico.crm },
            { campo: "nome", valor: medico.nome },
            { campo: "especialidade", valor: medico.especialidade },
            { campo: "Estado_CRM", valor: medico.Estado_CRM },
            { campo: "ID_Usuario", valor: medico.idUsuario },
            
        ]);
        medico.id = parseInt(data.insertId);
        return medico;
    }

    public update = async (medico: Medico, id: number): Promise<Medico> => {
        await this.db.update(this.nomeTabela, [
            { campo: "crm", valor: medico.crm },
            { campo: "nome", valor: medico.nome },
            { campo: "especialidade", valor: medico.especialidade },
            { campo: "modified", valor: new Date() }
        ], [{ campo: "id", valor: id }]);
        medico.id = id;
        return medico;
    }

    public delete = async (id: number): Promise<boolean> => {
        const result = await this.db.delete(this.nomeTabela, [{ campo: "id", valor: id }]);
        return result ? true : false;
    }
}

export default MedicoRepository;
