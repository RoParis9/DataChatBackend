import { randomUUID } from "crypto";

export class DepartmentId {
  private readonly value: string;

  private constructor(value: string) {
    if (!value) {
      throw new Error("DepartmentId cannot be empty")
    }
    this.value = value
  }

  static fromString(value: string): DepartmentId {
    return new DepartmentId(value);
  }

  static create(): DepartmentId {
    return new DepartmentId(randomUUID())
  }

  equals(other: DepartmentId): boolean {
    return this.value === other.value
  }
  toString(): string {
    return this.value
  }
}
