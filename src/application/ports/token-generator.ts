import { TokenPayload } from "./token-verifier";

export interface TokenGenerator {
  generateAccessToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
}
