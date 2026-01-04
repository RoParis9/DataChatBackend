import { randomUUID } from "crypto";

export class CompanyId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("CompanyId Cannot be empty");
  }

  equals(other: CompanyId): boolean {
    return this.value === other.value
  }


  static create(): CompanyId {
    return new CompanyId(randomUUID());
  }

  static fromString(value: string): CompanyId {
    if (!value || !value.trim()) {
      throw new Error("CompanyId cannot be empty");
    }

    return new CompanyId(value);
  }

  toString(): string {
    return this.value;
  }
}
