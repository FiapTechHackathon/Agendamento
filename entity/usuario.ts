import * as bcrypt from 'bcryptjs';
import BadRequestError from '../application/exception/BadRequestError';

class Usuario {
    public id: number | null = null;
    public senhaHash: string;

    constructor(
        senha: string,
        senhaHash?: string
    ) {
        if (senhaHash) {
            this.senhaHash = senhaHash; // Usar hash existente (para autenticação)
        } else {
            this.senhaHash = this.hashPassword(senha); // Gerar hash (para criação de usuário)
        }
        this.validate();
    }

    private validate() {
        if (!this.senhaHash) {
            throw new BadRequestError('Senha é obrigatória.');
        }
    }

    public hashPassword(senha: string): string {
        return bcrypt.hashSync(senha, 10);
    }

    public checkPassword(senha: string): boolean {
        return bcrypt.compareSync(senha, this.senhaHash);
    }
}

export default Usuario;
