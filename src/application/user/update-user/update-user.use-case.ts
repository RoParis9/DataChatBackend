import { UserRepository } from "src/domain/repositories/user.repository";
import { Email } from "src/domain/value-objects/Email";
import { UserId } from "src/domain/value-objects/UserId";
import { UserNotfoundError } from "../errors/user-not-found.error";
import { UpdateUserInput } from "./UpdateUserInput";

export class UpdateUserUseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: UpdateUserInput): Promise<void> {
    const newUserId = new UserId(input.userId)

    const user = await this.userRepository.findById(newUserId)

    if (!user) {
      throw new UserNotfoundError()
    }

    if (input.email) {
      user.changeEmail(new Email(input.email))
    }

    if (input.name) {
      user.changeName(input.name)
    }

    if (input.role) {
      user.changeRole(input.role)
    }
    await this.userRepository.save(user)
  }
}


