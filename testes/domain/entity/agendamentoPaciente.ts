import agendamentoPaciente from '../../../entity/agendamentoPaciente';
import BadRequestError from './../../../application/exception/BadRequestError';
import { statusAgendamento } from '../../../entity/enum/statusAgendamento';


describe('agendamentoPaciente', () => {
  it('should throw BadRequestError if idPaciente is not provided', () => {
    expect(() => new agendamentoPaciente(undefined, 1)).toThrow(BadRequestError);
  });

  it('should throw BadRequestError if idAgenda is not provided', () => {
    expect(() => new agendamentoPaciente(1, undefined)).toThrow(BadRequestError);
  });

  it('should create an instance of agendamentoPaciente with provided arguments', () => {
    const idPaciente = 1;
    const idAgenda = 1;
    const status = statusAgendamento.CONFIRMADO;
    const justificativa = 'Some justificativa';

    const agendamento = new agendamentoPaciente(idPaciente, idAgenda, status, justificativa);

    expect(agendamento.idPaciente).toBe(idPaciente);
    expect(agendamento.idAgenda).toBe(idAgenda);
    expect(agendamento.status).toBe(status);
    expect(agendamento.Justificativa).toBe(justificativa);
  });
});
