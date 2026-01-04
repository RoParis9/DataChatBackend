import { FileStatus } from "../Enums/file-status";
import { CompanyId } from "../value-objects/CompanyId";
import { DepartmentId } from "../value-objects/DepartmentId";
import { FileId } from "../value-objects/FileId";
import { UserId } from "../value-objects/UserId";

export class DomainFile {
  private constructor(
    public readonly id: FileId,
    public readonly companyId: CompanyId,
    public readonly uploadedBy: UserId,
    public readonly departmentId: DepartmentId,
    private name: string,
    private s3Key: string,
    private status: FileStatus,
    public readonly createdAt: Date
  ) {}

  static create(params: {
    id: FileId;
    companyId: CompanyId;
    uploadedBy: UserId;
    departmentId: DepartmentId;
    name: string;
    s3Key: string;
    createdAt: Date;
  }): DomainFile {
    return new DomainFile(
      params.id,
      params.companyId,
      params.uploadedBy,
      params.departmentId,
      params.name,
      params.s3Key,
      FileStatus.UPLOADED,
      params.createdAt
    );
  }

  markProcessing() {
    this.status = FileStatus.PROCESSING;
  }

  markVectorized() {
    this.status = FileStatus.VECTORIZED;
  }

  markFailed() {
    this.status = FileStatus.FAILED;
  }

  canBeAccessedByDepartment(departmentId: DepartmentId): boolean {
    return this.departmentId.equals(departmentId);
  }

  getStatus() {
    return this.status;
  }
  getS3Key(): string {
    return this.s3Key
  }
  getName(): string {
    return this.name
  }
}
