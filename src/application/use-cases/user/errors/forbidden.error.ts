
export class ForbiddenError extends Error {

  constructor(message?: string) {
    if (message) {
      super(message)
    }
    super("You are not allowed to do this.")
  }
}
