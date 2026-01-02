
export class ForbiddenError extends Error {
  constructor() {
    super("Only Managers can view all the users")
  }
}
