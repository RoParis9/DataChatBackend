export class S3Key {
  private constructor(public readonly value: string) {}

  static create(params: {
    companyId: string;
    fileId: string;
    filename: string;
  }): S3Key {
    const sanitizedFilename = params.filename.replace(/\s+/g, '-');
    const key = `companies/${params.companyId}/files/${params.fileId}/${sanitizedFilename}`;
    return new S3Key(key);
  }
}
