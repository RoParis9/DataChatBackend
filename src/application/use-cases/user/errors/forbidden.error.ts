
export class ForbiddenError extends Error {
  constructor() {
    super("You are not allowed to do this.")
  }
}
