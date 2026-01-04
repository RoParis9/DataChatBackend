import { File } from "src/domain/entities/file.entity";
import { CompanyId } from "src/domain/value-objects/CompanyId";
import { DepartmentId } from "src/domain/value-objects/DepartmentId";
import { FileId } from "../value-objects/FileId";

export interface FileRepository {
  save(file: File): Promise<void>;
  findByCompany(companyId: CompanyId): Promise<File[]>;
  findByDepartment(departmentId: DepartmentId): Promise<File[]>;
  findById(id: FileId): Promise<File | null>;
}
