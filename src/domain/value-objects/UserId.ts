import { randomUUID } from "crypto";

export class UserId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("UserID Cannot be empty");
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }

  static create(): UserId {
    return new UserId(randomUUID());
  }

  static fromString(value: string): UserId {
    return new UserId(value);
  }
}
