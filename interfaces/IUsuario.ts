import Usuario from "../entity/usuario";
import IRepository from "./IRepository";

interface IUsuario extends IRepository {

findBySenha(id: number, senha:string): Promise<boolean>;

}

export default IUsuario;
