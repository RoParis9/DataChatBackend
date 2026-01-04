export interface RegisterUploadedFileInput {
  fileId: string;
  filename: string;
  s3Key: string;
  contentType: string;
  size: number;
  departmentId?: string;
}
