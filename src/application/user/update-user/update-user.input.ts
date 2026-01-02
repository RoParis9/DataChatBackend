import { UserRole } from "src/domain/entities/user.entity";

export interface UpdateUserInput {
  userId: string;
  name?: string;
  email?: string;
  role?: UserRole;
}
