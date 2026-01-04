import { FilePurpose } from "src/domain/Enums/file-purpose";

export interface GenerateFileUploadUrlInput {
  filename: string;
  contentType: string;
  purpose: FilePurpose;
}
