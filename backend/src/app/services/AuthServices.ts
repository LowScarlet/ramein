import bcrypt from 'bcryptjs';

const hashSalt = 12;

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, hashSalt);
}

export {
  hashPassword
};
