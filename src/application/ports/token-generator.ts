import { TokenPayload } from "./token-verifier";

export interface TokenGenerator {
  generateAcessToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
}
