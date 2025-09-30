import { JWTPayload } from "jose";

export default interface IJwtPayload extends JWTPayload {
  userId: string;
}
