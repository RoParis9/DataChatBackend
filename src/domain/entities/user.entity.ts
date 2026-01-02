import { CannotDemoteAdmin } from "../exceptions/CannotDemoteAdmin";
import { InvalidUserName } from "../exceptions/InvalidUserName";
import { CompanyId } from "../value-objects/CompanyId";
import { Email } from "../value-objects/Email";
import { PasswordHash } from "../value-objects/Password-Hash";
import { UserId } from "../value-objects/UserId";

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  DEPARTMENT_MANAGER = "DEPARTMENT_MANAGER",
  COMPANY_OWNER = "COMPANY_OWNER",
  ADMIN = "ADMIN",
}

export class User {
  constructor(
    public readonly id: UserId,
    public readonly companyId: CompanyId,
    public name: string,
    public email: Email,
    public passwordHash: PasswordHash,
    public role: UserRole,
    public readonly createdAt: Date,
    public readonly departmentId?: string,
  ) {}

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN
  }
  isEmployee(): boolean {
    return this.role === UserRole.EMPLOYEE
  }
  changeEmail(newEmail: Email) {
    this.email = newEmail
  }
  changeRole(newRole: UserRole) {
    if (this.role === UserRole.ADMIN && newRole !== UserRole.ADMIN) {
      throw new CannotDemoteAdmin()
    }
    this.role = newRole;
  }
  changeName(name: string) {
    if (!name.trim()) {
      throw new InvalidUserName();
    }

    this.name = name;
  }
  isDepartmentManager(): boolean {
    return this.role === UserRole.DEPARTMENT_MANAGER;
  }
  isCompanyOwner(): boolean {
    return this.role === UserRole.COMPANY_OWNER
  }
  belongsToDepartment(departmentId: string): boolean {
    return this.departmentId === departmentId
  }
}
