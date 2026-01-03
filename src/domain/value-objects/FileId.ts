import { randomUUID } from "crypto";

export class FileId {
  private constructor(private readonly value: string) {
    if (!value) throw new Error("FileId cannot be empty");
  }

  static create(): FileId {
    return new FileId(randomUUID());
  }

  static fromString(value: string): FileId {
    return new FileId(value);
  }

  equals(other: FileId): boolean {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
