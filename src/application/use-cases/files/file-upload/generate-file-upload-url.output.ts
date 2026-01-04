export interface GenerateFileUploadUrlOutput {
  fileId: string;
  uploadUrl: string;
  s3Key: string;
  expiresInSeconds: number;
}
