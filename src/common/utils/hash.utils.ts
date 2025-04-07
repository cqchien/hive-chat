import bcrypt from 'bcrypt';

export const generateHash = (password: string, salt?: number): string =>
  bcrypt.hashSync(password, salt ?? 10);

export const compareHash = (password: string, hash: string): boolean => {
  if (!password || !hash) {
    return false;
  }

  return bcrypt.compareSync(password, hash);
};
