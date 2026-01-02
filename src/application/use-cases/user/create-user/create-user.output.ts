import { UserRole } from "src/domain/entities/user.entity";

export interface CreateUserOutput {
  id: string;
  email: string;
  role: UserRole;
}
