import { User } from "src/domain/entities/user.entity";

export interface TokenGenerator {
  generateAcessToken(user: User): string;
  generateRefreshToken(user: User): string;
}
