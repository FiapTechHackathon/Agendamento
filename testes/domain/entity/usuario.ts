import Usuario from '../../../entity/usuario';
import bcrypt from 'bcryptjs';

describe('Usuario', () => {
  describe('constructor', () => {
    it('should generate hash when creating a new user', () => {
      const senha = 'password123';
      const usuario = new Usuario(senha);

      expect(usuario.senhaHash).not.toBeNull;
      expect(bcrypt.compareSync(senha, usuario.senhaHash)).toBe(true);
    });

    it('should use existing hash when creating a user with a hash', () => {
      const senha = 'password123';
      const senhaHash = bcrypt.hashSync(senha, 10);
      const usuario = new Usuario(senha, senhaHash);

      expect(usuario.senhaHash).toEqual(senhaHash);
      expect(bcrypt.compareSync(senha, usuario.senhaHash)).toBe(true);
    });
  });

  describe('checkPassword', () => {
    it('should return true if the provided password matches the stored hash', () => {
      const senha = 'password123';
      const usuario = new Usuario(senha);

      expect(usuario.checkPassword(senha)).toBe(true);
    });

    it('should return false if the provided password does not match the stored hash', () => {
      const senha = 'password123';
      const usuario = new Usuario(senha);

      expect(usuario.checkPassword('wrongpassword')).toBe(false);
    });
  });
});
