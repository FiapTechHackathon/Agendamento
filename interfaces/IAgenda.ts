import Agenda from "../entity/agenda";
import IRepository from "./IRepository";

interface IAgenda extends IRepository {
    getAll(): Promise<Agenda[]>;
    findById(id: number): Promise<Agenda>;
    store(agenda: Agenda): Promise<Agenda>;
    update(agenda: Agenda, id: number): Promise<Agenda>;
    delete(id: number): Promise<boolean>;
}

export default IAgenda;
