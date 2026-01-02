import { UserRole } from "src/domain/entities/user.entity";

export interface ListUsersOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
