import { UserRole } from "src/domain/entities/user.entity";

export interface GetUserOutput {
  id: string;
  companyId: string;
  name: string;
  role: UserRole;
  email: string;
}
