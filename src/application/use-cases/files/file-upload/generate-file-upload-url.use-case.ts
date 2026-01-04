import { StorageService } from "src/application/ports/file-storage";
import { IdGenerator } from "src/application/ports/id-generator";
import { User } from "src/domain/entities/user.entity";
import { FileId } from "src/domain/value-objects/FileId";
import { ForbiddenError } from "../../user/errors/forbidden.error";
import { GenerateFileUploadUrlInput } from "./generate-file-upload-url.input";
import { GenerateFileUploadUrlOutput } from "./generate-file-upload-url.output";

export class GenerateFileUploadUrlUseCase {
  constructor(
    private readonly storageService: StorageService,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(
    requester: User,
    input: GenerateFileUploadUrlInput
  ): Promise<GenerateFileUploadUrlOutput> {
    if (!requester.companyId) {
      throw new ForbiddenError();
    }

    const fileId = FileId.fromString(this.idGenerator.generate());

    const s3Key = this.buildS3Key({
      companyId: requester.companyId.toString(),
      fileId: fileId.toString(),
      filename: input.filename,
    });

    const uploadUrl = await this.storageService.generatePresignedUploadUrl({
      key: s3Key,
      contentType: input.contentType,
      expiresInSeconds: 300,
    });

    return {
      fileId: fileId.toString(),
      uploadUrl,
      s3Key,
      expiresInSeconds: 300,
    };
  }

  private buildS3Key(params: {
    companyId: string;
    fileId: string;
    filename: string;
  }): string {
    const sanitizedFilename = params.filename.replace(/\s+/g, "_");

    return `companies/${params.companyId}/files/${params.fileId}-${sanitizedFilename}`;
  }
}
