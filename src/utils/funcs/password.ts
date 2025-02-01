import { hash, genSalt, compare } from 'bcrypt';
export const hashPassword = async (
  password: string,
): Promise<string | undefined> => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

export const comparePassword = async (plainPassword: string, hash: string) => {
  const match = await compare(plainPassword, hash);
  return match;
};
