import { AgendamentoPacienteCasoDeUso } from '../../../useCase/agendaPacienteCasodeUso';
import BadRequestError from './../../../application/exception/BadRequestError';
import Agenda from '../../../entity/agenda';
import IAgenda from '../../../interfaces/IAgenda';
import { statusAgendamento } from '../../../entity/enum/statusAgendamento';
import AgendamentoPaciente from '../../../entity/agendamentoPaciente';

describe('AgendamentoPacienteCasoDeUso', () => {
  let agendamentoRepository: any;

  const agendamento = new AgendamentoPaciente(1, 1, statusAgendamento.CONFIRMADO, 'Tosse');

  beforeEach(() => {
    agendamentoRepository = {
      getAll: jest.fn(),
      store: jest.fn(),
      findByIdAgenda: jest.fn(),
      update: jest.fn(),
      aceitaRecusaAgendamento: jest.fn(),
    };
  });

  describe('getAllAgendamentosPaciente', () => {
    it('should return all agendamentos', async () => {
      const agendamentos = [agendamento];
      agendamentoRepository.getAll.mockResolvedValue(agendamentos);

      const result = await AgendamentoPacienteCasoDeUso.getAllAgendamentosPaciente(agendamentoRepository);

      expect(result).toStrictEqual(agendamentos);
      expect(agendamentoRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('criarAgendamentoPaciente', () => {
    it('should create a new agendamento', async () => {
      agendamentoRepository.store.mockResolvedValue(agendamento);

      const result = await AgendamentoPacienteCasoDeUso.criarAgendamentoPaciente(agendamento, agendamentoRepository);

      expect(result).toEqual(agendamento);
      expect(agendamentoRepository.store).toHaveBeenCalledWith(agendamento);
    });
  });

  describe('atualizarAgendamentoPaciente', () => {
    it('should update an existing agendamento', async () => {
      agendamentoRepository.findByIdAgenda.mockResolvedValue(agendamento);
      agendamentoRepository.update.mockResolvedValue(agendamento);

      const result = await AgendamentoPacienteCasoDeUso.atualizarAgendamentoPaciente(agendamento, agendamentoRepository);

      expect(result).toEqual(agendamento);
      expect(agendamentoRepository.findByIdAgenda).toHaveBeenCalledWith(agendamento.idPaciente, agendamento.idAgenda);
      expect(agendamentoRepository.update).toHaveBeenCalledWith(agendamento);
    });
  });

  describe('atualizarStatusAgendamentoPaciente', () => {
    it('should update the status of an existing agendamento', async () => {
      agendamentoRepository.findByIdAgenda.mockResolvedValue(agendamento);
      agendamentoRepository.aceitaRecusaAgendamento.mockResolvedValue(agendamento);

      const result = await AgendamentoPacienteCasoDeUso.atualizarStatusAgendamentoPaciente(agendamento, agendamentoRepository);

      expect(result).toEqual(agendamento);
      expect(agendamentoRepository.findByIdAgenda).toHaveBeenCalledWith(agendamento.idPaciente, agendamento.idAgenda);
      expect(agendamentoRepository.aceitaRecusaAgendamento).toHaveBeenCalledWith(agendamento);
    });
  });
});