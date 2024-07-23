import userJWT from '../../../entity/userJWT';

describe('userJWT', () => {
  describe('isValidName', () => {
    it('should return true if name is valid', () => {
      const user = new userJWT('John Doe', 'john@example.com');
      expect(user.isValidName()).toBe(true);
    });

    it('should return false if name is null', () => {
      const user = new userJWT(null, 'john@example.com');
      expect(user.isValidName()).toBe(false);
    });

    it('should return false if name is empty', () => {
      const user = new userJWT('', 'john@example.com');
      expect(user.isValidName()).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true if email is valid', () => {
      const user = new userJWT('John Doe', 'john@example.com');
      expect(user.isValidEmail()).toBe(true);
    });
  });
});
