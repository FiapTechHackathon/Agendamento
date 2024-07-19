import BadRequestError from '../application/exception/BadRequestError';
class medico {
    public id: number;
  
    constructor(
      readonly nome: string,
      readonly crm: string,
      readonly especialidade: string,
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
    //   if (!this.idUsuario || isNaN(this.idUsuario)) {
    //     throw new BadRequestError('ID do usuário é obrigatório e deve ser um número.');
    // }
    }
  }
  export default medico;