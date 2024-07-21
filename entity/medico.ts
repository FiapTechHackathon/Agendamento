import BadRequestError from '../application/exception/BadRequestError';
import { especialidadeMedico } from './enum/especialidadeMedico';
class medico {
    public id: number;
  
    constructor(
      readonly nome: string,
      readonly crm: string,
      readonly especialidade: especialidadeMedico,
      readonly Estado_CRM:string,
      public idUsuario?: number
    ) {
      if (!crm) {
        throw new BadRequestError("CRM é obrigatório.");
      }
      if (!nome) {
        throw new BadRequestError("Nome é obrigatório.");
      }
      if (!especialidade) {
        throw new BadRequestError("Especialidade é obrigatória.");
      }
      if (!especialidade || !Object.values(especialidadeMedico).includes(especialidade)) {
        throw new BadRequestError("Especialidade é obrigatória e deve ser uma das especialidades válidas");
    }
    //   if (!this.idUsuario || isNaN(this.idUsuario)) {
    //     throw new BadRequestError('ID do usuário é obrigatório e deve ser um número.');
    // }
    }
  }
  export default medico;