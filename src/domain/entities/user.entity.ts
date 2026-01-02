import { CompanyId } from "../value-objects/CompanyId";
import { Email } from "../value-objects/Email";
import { PasswordHash } from "../value-objects/Password-Hash";
import { UserId } from "../value-objects/UserId";

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN"
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

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN
  }
  public isManager(): boolean {
    return this.role === UserRole.MANAGER
  }
  public isEmployee(): boolean {
    return this.role === UserRole.EMPLOYEE
  }
  changeEmail(newEmail: Email) {
    this.email = newEmail
  }
  changeRole(newRole: UserRole) {
    if (this.role === UserRole.ADMIN && newRole !== UserRole.ADMIN) {
      throw new CannotDemoteAdminError()
    }
    this.role = newRole;
  }
  changeName(name: string) {
    if (!name.trim()) {
      throw new InvalidUSerNameError();
    }

    this.name = name;
  }
}
