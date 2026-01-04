import { UserRole } from "src/domain/Enums/user-roles";

export interface UpdateUserInput {
  userId: string;
  name?: string;
  email?: string;
  role?: UserRole;
}
