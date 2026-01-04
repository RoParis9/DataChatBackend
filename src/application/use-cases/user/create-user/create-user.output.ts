import { UserRole } from "src/domain/Enums/user-roles";

export interface CreateUserOutput {
  id: string;
  email: string;
  role: UserRole;
}
