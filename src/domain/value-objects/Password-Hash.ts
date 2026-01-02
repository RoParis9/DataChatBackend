
export class PasswordHash {
  private constructor(public readonly value: string) {}

  static fromHash(hash: string) {
    return new PasswordHash(hash)
  }
}
