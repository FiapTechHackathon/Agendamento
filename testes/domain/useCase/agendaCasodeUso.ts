import { AgendaCasoDeUso } from '../../../useCase/agendaCasodeUso';
import BadRequestError from './../../../application/exception/BadRequestError';
import Agenda from '../../../entity/agenda';
import IAgenda from '../../../interfaces/IAgenda';
import { statusAgenda } from '../../../entity/enum/statusAgenda';

describe('AgendaCasoDeUso', () => {
  let agendaRepository: IAgenda;

  const agenda = new Agenda(new Date(), '09:00', '10:00', statusAgenda.DISPONIVEL, 1);

  beforeEach(() => {
    agendaRepository = {
      db: null,
      getAll: async () => [],
      store: async (agenda: Agenda) => agenda,
      findById: async (id: number) => null,
      update: async (agenda: Agenda, id: number) => agenda,
      delete: async (id: number) => true,
    };
  });

  describe('getAllAgendasDiponiveis', () => {
    it('should return all agendas', async () => {
      const agendas = await AgendaCasoDeUso.getAllAgendasDiponiveis(agendaRepository);
      expect(agendas).toBeInstanceOf(Array);
    });
  });

  describe('criarAgenda', () => {
    it('should create a new agenda', async () => {
      const createdAgenda = await AgendaCasoDeUso.criarAgenda(agenda, agendaRepository);
      expect(createdAgenda).toStrictEqual(agenda);
    });
  });

  describe('atualizarAgenda', () => {
    it('should update an existing agenda', async () => {
      agendaRepository.findById = jest.fn().mockResolvedValue(agenda);
      const updatedAgenda = await AgendaCasoDeUso.atualizarAgenda(agenda, 1, agendaRepository);
      expect(updatedAgenda).toStrictEqual(agenda);
    });

    it('should throw BadRequestError if agenda is not found', async () => {
      try {
        await AgendaCasoDeUso.atualizarAgenda(agenda, 1, agendaRepository);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toEqual('Agenda não encontrada.');
      }
    });
  });

  describe('encontrarAgendaPorIdMedico', () => {
    it('should find an agenda by ID', async () => {
      const agenda = await AgendaCasoDeUso.encontrarAgendaPorIdMedico(1, agendaRepository);
      expect(agenda).toBeNull;
    });
  });

  describe('deleteAgenda', () => {
    it('should delete an agenda', async () => {
      const result = await AgendaCasoDeUso.deleteAgenda(1, agendaRepository);
      expect(result).toBeTruthy;
    });
  });
});
