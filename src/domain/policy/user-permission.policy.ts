import { User } from "../entities/user.entity";
import { CompanyId } from "../value-objects/CompanyId";
import { DepartmentId } from "../value-objects/DepartmentId";

export class UserPermissionPolicy {
  static canViewCompany(user: User, companyId: CompanyId): boolean {
    return user.isAdmin() || user.belongsToCompany(companyId);
  }

  static canViewDepartment(user: User, departmentId: DepartmentId): boolean {
    if (user.isAdmin()) return true;
    if (user.isCompanyOwner()) return true;
    if (user.isDepartmentManager()) {
      return user.belongsToDepartment(departmentId);
    }
    return false;
  }

  static canManageUsers(user: User): boolean {
    return user.isAdmin() || user.isCompanyOwner();
  }

  static canUploadFiles(user: User, departmentId: DepartmentId): boolean {
    return (
      user.isEmployee() ||
      user.isDepartmentManager() ||
      user.isCompanyOwner() ||
      user.isAdmin())
  }

  static canSeeFiles(user: User, departmentId: DepartmentId): boolean {
    if (user.isAdmin() || user.isCompanyOwner()) return true
    return user.departmentId?.equals(departmentId) ?? false
  }
}
