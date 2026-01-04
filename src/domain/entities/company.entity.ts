import { CompanyId } from "../value-objects/CompanyId";

export class Company {
  constructor(
    public readonly id: CompanyId,
    private name: string,
    public readonly createdAt: Date
  ) {
    if (!name.trim()) {
      throw new Error("Company name cannot be empty")
    }
  }

  changeName(newName: string) {
    if (!newName.trim()) {
      throw new Error("Company name cannot be empty")
    }
    this.name = newName
  }
  getName() {
    return this.name
  }

  static create(name: string): Company {
    if (!name.trim()) {
      throw new Error("Company name cannot be empty")
    }
    return new Company(
      CompanyId.create(),
      name.trim(),
      new Date()
    )
  }

  static fromPersistence(
    id: CompanyId,
    name: string,
    createdAt: Date
  ): Company {
    return new Company(id, name, createdAt);
  }
}
