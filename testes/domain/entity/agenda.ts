import agenda from '../../../entity/agenda';
import BadRequestError from './../../../application/exception/BadRequestError';
import { statusAgenda } from '../../../entity/enum/statusAgenda';

describe('agenda', () => {
  describe('constructor', () => {
    it('should throw an error if data is not provided', () => {
      expect(() => new agenda(null, '09:00', '10:00', statusAgenda.DISPONIVEL, 1)).toThrow(BadRequestError);
      expect(() => new agenda(null, '09:00', '10:00', statusAgenda.DISPONIVEL, 1)).toThrow('Data é obrigatória.');
    });

    it('should throw an error if horaInicio is not provided', () => {
      expect(() => new agenda(new Date(), null, '10:00', statusAgenda.DISPONIVEL, 1)).toThrow(BadRequestError);
      expect(() => new agenda(new Date(), null, '10:00', statusAgenda.DISPONIVEL, 1)).toThrow('Hora de início é obrigatória.');
    });

    it('should throw an error if horaFim is not provided', () => {
      expect(() => new agenda(new Date(), '09:00', null, statusAgenda.DISPONIVEL, 1)).toThrow(BadRequestError);
      expect(() => new agenda(new Date(), '09:00', null, statusAgenda.DISPONIVEL, 1)).toThrow('Hora de fim é obrigatória.');
    });

    it('should throw an error if idMedico is not provided', () => {
      expect(() => new agenda(new Date(), '09:00', '10:00', statusAgenda.DISPONIVEL, null)).toThrow(BadRequestError);
      expect(() => new agenda(new Date(), '09:00', '10:00', statusAgenda.DISPONIVEL, null)).toThrow('ID do médico é obrigatório.');
    });
  });
});
