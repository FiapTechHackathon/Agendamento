import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import BadRequestError from '../application/exception/BadRequestError';

class paciente {
    public id: number;
  
    constructor(
      readonly nome: string,
      readonly cpf: string,
      readonly email: string,
      public idUsuario?: number
    ) {
      if (!nome) {
        throw new BadRequestError("Nome é obrigatório.");
      }
      if (!cpf) {
        throw new BadRequestError("CPF é obrigatório.");
      }
  
      this.cpf = String(cpf).replace(".", "").replace("-", "").replace(".", "");
   
      if (!this.isValidCpf()) {
        throw new BadRequestError("CPF inválido.");
      }
  
      if (!email) {
        throw new BadRequestError("E-mail é obrigatório.");
      }
  
      this.email = email.toLocaleLowerCase();
  
      if (!this.isValidEmail()) {
        throw new BadRequestError("E-mail inválido.");
      }
      // if (!this.idUsuario || isNaN(this.idUsuario)) {
      //   throw new BadRequestError('ID do usuário é obrigatório e deve ser um número.');
    //}
    }
  
    private isValidCpf(): boolean {

      return cpfValidator.isValid(this.cpf);
    }
  
    private isValidEmail(): boolean {
      const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return expression.test(this.email);
    }
  }
  

export default paciente;