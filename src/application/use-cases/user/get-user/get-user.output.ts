import { UserRole } from "src/domain/Enums/user-roles";

export interface GetUserOutput {
  id: string;
  companyId: string;
  name: string;
  role: UserRole;
  email: string;
}
