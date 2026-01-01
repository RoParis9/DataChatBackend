import { Email } from "../value-objects/Email";

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN"
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    public role: UserRole,
    public tenantId: string,
    public departmentId?: string,
    public readonly createdAt?: Date,
  ) {}

  public isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
  public isManager(): boolean {
    return this.role === 'MANAGER'
  }
  public isEmployee(): boolean {
    return this.role === 'EMPLOYEE'
  }
}
