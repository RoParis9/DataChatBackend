export interface StorageService {
  generatePresignedUploadUrl(params: {
    key: string;
    contentType: string;
    expiresInSeconds: number;
  }): Promise<string>;
}
