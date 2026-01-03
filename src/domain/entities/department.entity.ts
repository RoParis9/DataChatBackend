import { CompanyId } from "../value-objects/CompanyId";
import { DepartmentId } from "../value-objects/DepartmentId";
import { UserId } from "../value-objects/UserId";

export class Department {
  constructor(
    public readonly id: DepartmentId,
    private name: string,
    private companyId: CompanyId,
    private managerId?: UserId
  ) {}

  assignManager(userId: UserId) {
    this.managerId = userId
  }

  belongsToCompany(companyId: CompanyId) {
    return this.companyId.equals(companyId)
  }

  isManagedBy(userId: UserId) {
    return this.managerId?.equals(userId) ?? false
  }
}
