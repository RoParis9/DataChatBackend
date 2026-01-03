import { UserRole } from "src/domain/Enums/user-roles";

export interface ListUsersOutput {
  users: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }[];
}
