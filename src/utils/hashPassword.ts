import bcrypt from "bcrypt";
import winston from "winston";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = 8;

  try {
    return await bcrypt.hash(password, salt);
  } catch (e) {
    if (e instanceof Error) {
      winston.log("error", `Error during password hash: ${e.message}`);
    }
    throw new Error();
  }
};
