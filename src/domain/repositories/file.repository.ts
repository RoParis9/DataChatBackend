import { DomainFile } from "src/domain/entities/file.entity";
import { CompanyId } from "src/domain/value-objects/CompanyId";
import { DepartmentId } from "src/domain/value-objects/DepartmentId";
import { FileId } from "../value-objects/FileId";

export interface FileRepository {
  save(file: DomainFile): Promise<void>;
  findByCompany(companyId: CompanyId): Promise<DomainFile[]>;
  findByDepartment(departmentId: DepartmentId): Promise<DomainFile[]>;
  findById(id: FileId): Promise<DomainFile | null>;
}
