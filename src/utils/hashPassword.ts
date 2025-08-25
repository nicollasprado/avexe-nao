import bcrypt from "bcrypt";
import winston from "winston";

export const hashPassword = (password: string): string => {
  const salt = 8;

  try {
    return bcrypt.hashSync(password, salt);
  } catch (e) {
    if (e instanceof Error) {
      winston.log("error", `Error during password hash: ${e.message}`);
    }
    throw new Error();
  }
};
