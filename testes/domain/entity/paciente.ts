
import paciente from '../../../entity/paciente';
import BadRequestError from './../../../application/exception/BadRequestError';

describe('paciente', () => {
  it('should create a paciente instance when valid data is provided', () => {
    const nome = 'João da Silva';
    const cpf = '573.967.490-50';
    const email = 'joao@example.com';

    const pacienteInstance = new paciente(nome, cpf, email);

    expect(pacienteInstance).toBeInstanceOf(paciente);
    expect(pacienteInstance.nome).toBe(nome);
    expect(pacienteInstance.cpf).toBe('57396749050');
    expect(pacienteInstance.email).toBe(email.toLowerCase());
  });

  it('should throw BadRequestError if nome is not provided', () => {
    const nome = '';
    const cpf = '573.967.490-50';
    const email = 'joao@example.com';

    expect(() => new paciente(nome, cpf, email)).toThrow(BadRequestError);
    expect(() => new paciente(nome, cpf, email)).toThrow('Nome é obrigatório.');
  });

  it('should throw BadRequestError if cpf is not provided', () => {
    const nome = 'João da Silva';
    const cpf = '';
    const email = 'joao@example.com';

    expect(() => new paciente(nome, cpf, email)).toThrow(BadRequestError);
    expect(() => new paciente(nome, cpf, email)).toThrow('CPF é obrigatório.');
  });

  it('should throw BadRequestError if cpf is invalid', () => {
    const nome = 'João da Silva';
    const cpf = '123.456.789-00';
    const email = 'joao@example.com';

    expect(() => new paciente(nome, cpf, email)).toThrow(BadRequestError);
    expect(() => new paciente(nome, cpf, email)).toThrow('CPF inválido.');
  });

  it('should throw BadRequestError if email is not provided', () => {
    const nome = 'João da Silva';
    const cpf = '573.967.490-50';
    const email = '';

    expect(() => new paciente(nome, cpf, email)).toThrow(BadRequestError);
    expect(() => new paciente(nome, cpf, email)).toThrow('E-mail é obrigatório.');
  });

  it('should throw BadRequestError if email is invalid', () => {
    const nome = 'João da Silva';
    const cpf = '573.967.490-50';
    const email = 'invalid-email';

    expect(() => new paciente(nome, cpf, email)).toThrow(BadRequestError);
    expect(() => new paciente(nome, cpf, email)).toThrow('E-mail inválido.');
  });
});
