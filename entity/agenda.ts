import BadRequestError from '../application/exception/BadRequestError';
import { statusAgenda } from './enum/statusAgenda';
class agenda {

    public id: number;
  
    constructor(
      readonly data: Date,
      readonly horaInicio: string,
      readonly horaFim: string,
      readonly disponivel: statusAgenda,
      readonly idMedico: number,
      readonly Valor?
    ) {
      if (!data) {
        throw new BadRequestError("Data é obrigatória.");
      }
      if (!horaInicio) {
        throw new BadRequestError("Hora de início é obrigatória.");
      }
      if (!horaFim) {
        throw new BadRequestError("Hora de fim é obrigatória.");
      }
      if (!idMedico) {
        throw new BadRequestError("ID do médico é obrigatório.");
      }
    }
  }
  export default agenda