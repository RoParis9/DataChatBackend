export interface ListFilesOutput {
  files: {
    id: string;
    filename: string;
    contentType: string;
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  }[];
}
