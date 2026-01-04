import { User } from "../entities/user.entity";
import { CompanyId } from "../value-objects/CompanyId";
import { DepartmentId } from "../value-objects/DepartmentId";
import { Email } from "../value-objects/Email";
import { UserId } from "../value-objects/UserId";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  findByCompanyId(companyId: CompanyId): Promise<User[]>;
  findByDepartmentId(departmentId: DepartmentId): Promise<User[]>;
  delete(user: User): Promise<void>;
  updateUser(user: User): Promise<User>;
}
