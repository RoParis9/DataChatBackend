import { UserRole } from "../Enums/user-roles";
import { CannotDemoteAdmin } from "../exceptions/CannotDemoteAdmin";
import { InvalidUserName } from "../exceptions/InvalidUserName";
import { UserAlreadyAssignedToDepartment } from "../exceptions/UserAlreadyAssigendToDepartment";
import { CompanyId } from "../value-objects/CompanyId";
import { DepartmentId } from "../value-objects/DepartmentId";
import { Email } from "../value-objects/Email";
import { PasswordHash } from "../value-objects/Password-Hash";
import { UserId } from "../value-objects/UserId";

export class User {
  constructor(
    public readonly id: UserId,
    public readonly companyId: CompanyId,
    public name: string,
    public email: Email,
    public passwordHashed: PasswordHash,
    public role: UserRole,
    public readonly createdAt: Date,
    public departmentId?: DepartmentId,
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
  belongsToDepartment(departmentId: DepartmentId): boolean {
    return this.departmentId === departmentId
  }
  assignDepartment(departmentId: DepartmentId) {
    if (this.departmentId === departmentId) {
      throw new UserAlreadyAssignedToDepartment
    }
    this.departmentId = departmentId
  }
  belongsToCompany(companyId: CompanyId) {
    return this.companyId.equals(companyId)
  }

  static create(params: {
    name: string;
    email: Email;
    passwordHash: PasswordHash;
    role: UserRole;
    companyId: CompanyId;
  }): User {
    if (!params.name.trim()) {
      throw new Error("User name cannot be empty");
    }

    return new User(
      UserId.create(),
      params.companyId,
      params.name.trim(),
      params.email,
      params.passwordHash,
      params.role,
      new Date()
    );
  }
}
