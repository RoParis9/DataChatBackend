import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { TokenGenerator } from "src/application/ports/token-generator";
import { TokenPayload, TokenVerifier } from "src/application/ports/token-verifier";

export class JwtTokenService implements TokenGenerator, TokenVerifier {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;

  constructor() {
    if (
      !process.env.JWT_ACCESS_TOKEN_SECRET ||
      !process.env.JWT_REFRESH_TOKEN_SECRET
    ) {
      throw new Error("JWT secrets are not configured");
    }

    this.accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

    this.accessTokenOptions = {
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    };

    this.refreshTokenOptions = {
      expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
    };
  }

  generateAcessToken(payload: TokenPayload): string {
    return jwt.sign(
      {
        role: payload.role,
        companyId: payload.companyId,
      },
      this.accessTokenSecret,
      {
        ...this.accessTokenOptions,
        subject: payload.sub,
      }
    );
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(
      {
        role: payload.role,
        companyId: payload.companyId,
      },
      this.refreshTokenSecret,
      {
        ...this.refreshTokenOptions,
        subject: payload.sub,
      }
    );
  }

  verifyAcessToken(token: string): TokenPayload {
    const decoded = jwt.verify(
      token,
      this.accessTokenSecret
    ) as JwtPayload;

    return {
      sub: decoded.sub as string,
      role: decoded.role as string,
      companyId: decoded.companyId as string,
    };
  }

  verifyRefreshToken(token: string): TokenPayload {
    const decoded = jwt.verify(
      token,
      this.refreshTokenSecret
    ) as JwtPayload;

    return {
      sub: decoded.sub as string,
      role: decoded.role as string,
      companyId: decoded.companyId as string,
    };
  }
}
