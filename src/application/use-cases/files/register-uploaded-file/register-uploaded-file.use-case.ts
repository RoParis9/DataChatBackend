import { Clock } from "src/application/ports/clock";
import { EventBus } from "src/application/ports/event-bus";
import { DomainFile } from "src/domain/entities/file.entity";
import { User } from "src/domain/entities/user.entity";
import { FileRepository } from "src/domain/repositories/file.repository";
import { FileId } from "src/domain/value-objects/FileId";
import { ForbiddenError } from "../../user/errors/forbidden.error";
import { RegisterUploadedFileInput } from "./register-uploaded-file.input";
import { RegisterUploadedFileOutput } from "./register-uploaded-file.output";

export class RegisterUploadedFileUseCase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly eventBus: EventBus,
    private readonly clock: Clock,
  ) {}

  async execute(
    requester: User,
    input: RegisterUploadedFileInput
  ): Promise<RegisterUploadedFileOutput> {
    if (!requester.companyId) {
      throw new ForbiddenError();
    }

    if (!requester.departmentId) {
      throw new ForbiddenError("User must belong to a department")
    }

    const file = DomainFile.create({
      id: FileId.fromString(input.fileId),
      companyId: requester.companyId,
      uploadedBy: requester.id,
      departmentId: requester.departmentId,
      name: input.filename,
      s3Key: input.s3Key,
      createdAt: this.clock.now(),
    });

    await this.fileRepository.save(file);

    await this.eventBus.publish({
      name: "FileUploaded",
      payload: {
        fileId: file.id.toString(),
        companyId: file.companyId.toString(),
        departmentId: file.departmentId?.toString(),
        key: file.getS3Key(),
      },
    });

    return {
      fileId: file.id.toString(),
    };
  }
}
