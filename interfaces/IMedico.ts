import Medico from "../entity/medico";
import IRepository from "./IRepository";

interface IMedico extends IRepository {
    getAll(param): Promise<Medico[]>;
    findById(id: number): Promise<Medico>;
    findByCRM(crm: number): Promise<Medico>;
    store(medico: Medico): Promise<Medico>;
    update(medico: Medico, id: number): Promise<Medico>;
    delete(id: number): Promise<boolean>;
}

export default IMedico;
