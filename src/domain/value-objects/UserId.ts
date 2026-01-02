
export class UserId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("UserID Cannot be empty");
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }
}
