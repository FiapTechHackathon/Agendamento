import BadRequestError from '../application/exception/BadRequestError';
import {statusAgendamento} from '../entity/enum/statusAgendamento';
class agendamentoPaciente {
    public id: number;
  
    constructor(
      readonly idPaciente: number,
      readonly idAgenda: number,
      readonly status?: statusAgendamento,
      readonly Justificativa?: string,
    ) {
      if (!idPaciente) {
        throw new BadRequestError("ID do paciente é obrigatório.");
      }
      if (!idAgenda) {
        throw new BadRequestError("ID da agenda é obrigatório.");
      }
    }
  }
  export default agendamentoPaciente;