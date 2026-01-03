import { UserRole } from "src/domain/Enums/user-roles"

export interface SignUpInput {
  name: string
  email: string
  password: string
  isCompanyOwner: boolean
  companyName: string
  companyId?: string
  role?: UserRole.DEPARTMENT_MANAGER | UserRole.EMPLOYEE
}
