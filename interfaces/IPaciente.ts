import Paciente from "../entity/paciente";
import IRepository from "./IRepository";

interface IPaciente extends IRepository {
    findByCPF(cpf: string): Promise<Paciente>;
    findByEmail(email: string): Promise<Paciente>;
}

export default IPaciente;
