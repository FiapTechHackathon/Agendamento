import Usuario from "../entity/usuario";
import { IDataBase } from "../interfaces/IDataBase";
import IUsuario from "../interfaces/IUsuario";

class UsuarioRepository  implements IUsuario {
    public db: IDataBase;
    private nomeTabela = "Usuario";

    constructor(database: IDataBase) {
        this.db = database;
    }

    public async getAll(): Promise<Usuario[]> {
        throw new Error("Method not implemented.");
    }

    public async findById(id: number): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    public async findBySenha(id: number, senha: string): Promise<boolean> {
        // Recupera o usuário do banco de dados
        const result = await this.db.find(this.nomeTabela, null, [{ campo: "id", valor: id }]);
        
        // Verifica se o usuário foi encontrado
        if (!result || result.length === 0) return false; // Retorna false se o usuário não for encontrado
        
        // Obtém o hash da senha armazenada
        const data = result[0];
        const senhaHash = data.Senha;
    
        // Cria uma instância de Usuario com o hash da senha
        const usuario = new Usuario('', senhaHash);
        
        // Define o id do usuário (se necessário para o contexto)
        usuario.id = data.ID;
        
        // Verifica a senha fornecida com o método checkPassword
        return usuario.checkPassword(senha);
    }
    public store = async (usuario: Usuario): Promise<Usuario> => {

        const data = await this.db.store(this.nomeTabela, [
           // { campo: "login", valor: usuario.login },
            { campo: "senha", valor: usuario.senhaHash },
        ]);
        usuario.id = parseInt(data.insertId);
        return usuario;
    }

    public async update(usuario: Usuario, id: number): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

export default UsuarioRepository;
