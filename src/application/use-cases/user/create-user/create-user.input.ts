import { UserRole } from "src/domain/entities/user.entity";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyId: string;

}
