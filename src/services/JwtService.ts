import IJwtTokensDTO from "@/interfaces/dtos/IJwtTokensDTO";
import IJwtPayload from "@/interfaces/IJwtPayload";
import { SignJWT, jwtVerify } from "jose";

class JwtService {
  private secret: Uint8Array;
  private algorithm = "HS256";

  constructor() {
    this.secret = new TextEncoder().encode(process.env.SECRET_KEY!);
  }

  public async generateTokens(userId: string): Promise<IJwtTokensDTO> {
    const accessToken = await new SignJWT({ userId })
      .setProtectedHeader({
        alg: this.algorithm,
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(this.secret);

    const refreshToken = await new SignJWT({ userId })
      .setProtectedHeader({
        alg: this.algorithm,
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(this.secret);

    return { accessToken, refreshToken };
  }

  public async verifyToken(token: string): Promise<IJwtPayload | null> {
    try {
      const { payload } = await jwtVerify<IJwtPayload>(token, this.secret, {
        algorithms: [this.algorithm],
      });
      return payload;
    } catch {
      return null;
    }
  }

  public async refreshToken(token: string): Promise<IJwtTokensDTO | null> {
    const payload = await this.verifyToken(token);

    if (!payload) return null;

    return await this.generateTokens(payload.userId);
  }
}

export const jwtService = new JwtService();
