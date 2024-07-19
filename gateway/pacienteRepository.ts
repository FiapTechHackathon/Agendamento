import Paciente from "../entity/paciente";
import IPaciente from "../interfaces/IPaciente";
import { IDataBase } from "../interfaces/IDataBase";
import { cpf } from 'cpf-cnpj-validator';
import BadRequestError from '../application/exception/BadRequestError';

class PacienteRepository implements IPaciente {
    public db: IDataBase;
    private nomeTabela = "Paciente";

    constructor(database: IDataBase) {
        this.db = database;
    }

    public getAll = async (): Promise<Paciente[]> => {
        const result = await this.db.find(this.nomeTabela,null,null);
        if (!result || result.length === 0) return null;

        return result.map(data => {
            const paciente = new Paciente(data.Nome, data.CPF, data.Email, data.ID_Usuario);
            paciente.id = data.ID;
            return paciente;
        });
    }

    public findById = async (id: number): Promise<Paciente> => {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "id", valor: id }]);
        if (!result || result.length === 0) return null;

        const data = result[0];
        const paciente = new Paciente(data.Nome, data.CPF, data.Email, data.ID_Usuario);
        paciente.id = data.ID;
        return paciente;
    }
    

    public store = async (paciente: Paciente): Promise<Paciente> => {
        console.log('store',paciente);
        const data = await this.db.store(this.nomeTabela, [
            { campo: "nome", valor: paciente.nome },
            { campo: "cpf", valor: paciente.cpf },
            { campo: "email", valor: paciente.email },
            { campo: "ID_Usuario", valor: paciente.idUsuario },
        ]);
        paciente.id = parseInt(data.insertId);
        console.log('store2',paciente);
        return paciente;
    }

    public update = async (paciente: Paciente, id: number): Promise<Paciente> => {
        await this.db.update(this.nomeTabela, [
            { campo: "nome", valor: paciente.nome },
            { campo: "cpf_cnpj", valor: paciente.cpf },
            { campo: "email", valor: paciente.email },
            { campo: "modified", valor: new Date() }
        ], [{ campo: "id", valor: id }]);
        paciente.id = id;
        return paciente;
    }

    public delete = async (id: number): Promise<boolean> => {
        const result = await this.db.delete(this.nomeTabela, [{ campo: "id", valor: id }]);
        return result ? true : false;
    }

    public findByCPF = async (cpf: string): Promise<Paciente> => {
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "CPF", valor: cpf }]);
        if (!result || result.length === 0) return null;
        console.log(cpf);
        const data = result[0];
        const paciente = new Paciente(data.Nome, data.CPF, data.Email, data.ID_Usuario);
        paciente.id = data.id;
        return paciente;
    }

    public findByEmail = async (email: string): Promise<Paciente> => {
        console.log(email);
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "email", valor: email }]);
        console.log('result',result);
        if (!result || result.length === 0) return null;

        const data = result[0];
        console.log('result1',result[0]);
        console.log('result2',data.Nome);
        const paciente = new Paciente(data.Nome, data.CPF, data.Email, data.ID_Usuario);
        paciente.id = data.ID;
        return paciente;
    }
}

export default PacienteRepository;
