import medico from '../../../entity/medico';
import BadRequestError from './../../../application/exception/BadRequestError';
import { especialidadeMedico } from '../../../entity/enum/especialidadeMedico';

describe('medico', () => {
  it('should create a new medico instance', () => {
    const nome = 'John Doe';
    const crm = '123456';
    const especialidade = especialidadeMedico.CARDIOLOGIA;
    const estadoCRM = 'SP';
    const idUsuario = 1;

    const newMedico = new medico(nome, crm, especialidade, estadoCRM, idUsuario);

    expect(newMedico).toBeInstanceOf(medico);
    expect(newMedico.nome).toEqual(nome);
    expect(newMedico.crm).toEqual(crm);
    expect(newMedico.especialidade).toEqual(especialidade);
    expect(newMedico.Estado_CRM).toEqual(estadoCRM);
    expect(newMedico.idUsuario).toEqual(idUsuario);
  });

  it('should throw BadRequestError if crm is not provided', () => {
    const nome = 'John Doe';
    const especialidade = especialidadeMedico.CARDIOLOGIA;
    const estadoCRM = 'SP';
    const idUsuario = 1;

    expect(() => new medico(nome, '', especialidade, estadoCRM, idUsuario)).toThrow(BadRequestError)
    expect(() => new medico(nome, '', especialidade, estadoCRM, idUsuario)).toThrow('CRM é obrigatório.')
  });

  it('should throw BadRequestError if nome is not provided', () => {
    const crm = '123456';
    const especialidade = especialidadeMedico.CARDIOLOGIA;
    const estadoCRM = 'SP';
    const idUsuario = 1;

    expect(() => new medico('', crm, especialidade, estadoCRM, idUsuario)).toThrow(BadRequestError);
    expect(() => new medico('', crm, especialidade, estadoCRM, idUsuario)).toThrow('Nome é obrigatório.');
  });

  it('should throw BadRequestError if especialidade is not provided', () => {
    const nome = 'John Doe';
    const crm = '123456';
    const estadoCRM = 'SP';
    const idUsuario = 1;

    expect(() => new medico(nome, crm, null, estadoCRM, idUsuario)).toThrow(BadRequestError);
    expect(() => new medico(nome, crm, null, estadoCRM, idUsuario)).toThrow('Especialidade é obrigatória.');
  });
});
