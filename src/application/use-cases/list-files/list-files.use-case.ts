import { User } from "src/domain/entities/user.entity";
import { FileRepository } from "src/domain/repositories/file.repository";
import { ForbiddenError } from "../user/errors/forbidden.error";
import { ListFilesInput } from "./list-files.input";
import { ListFilesOutput } from "./list-files.output";

export class ListFilesUseCase {
  constructor(
    private readonly fileRepository: FileRepository,
  ) {}

  async execute(
    requester: User,
    input: ListFilesInput
  ): Promise<ListFilesOutput> {
    let files;

    if (requester.isAdmin() || requester.isCompanyOwner()) {
      files = await this.fileRepository.findByCompany(requester.companyId);
    } else if (requester.isDepartmentManager() || requester.isEmployee()) {
      if (!requester.departmentId) {
        throw new ForbiddenError();
      }
      files = await this.fileRepository.findByDepartment(
        requester.departmentId
      );
    } else {
      throw new ForbiddenError();
    }

    return {
      files: files.map(file => ({
        id: file.id.toString(),
        filename: file.filename,
        contentType: file.contentType,
        size: file.size,
        uploadedAt: file.createdAt,
        uploadedBy: file.uploaderId.toString(),
      })),
    };
  }
}
