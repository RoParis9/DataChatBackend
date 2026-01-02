
export interface TokenPayload {
  sub: string;
  role: string;
  companyId: string;
}

export interface TokenVerifier {
  verifyAcessToken(token: string): TokenPayload;
  verifyRefreshToken(token: string): TokenPayload;
}
