
export class CompanyId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("CompanyId Cannot be empty");
  }

  equals(other: CompanyId): boolean {
    return this.value === other.value
  }
}
