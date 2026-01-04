import { UserRole } from "src/domain/Enums/user-roles";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyId: string;
  departmentId?: string;
}
