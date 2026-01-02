import { UserRepository } from "src/domain/repositories/user.repository";
import { UserId } from "src/domain/value-objects/UserId";
import { UserNotfoundError } from "../errors/user-not-found.error";
import { GetUserInput } from "./get-user.input";
import { GetUserOutput } from "./get-user.output";


export class getUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const userId = new UserId(input.userId);

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotfoundError()
    }
    return {
      id: user.id.value,
      companyId: user.companyId.value,
      name: user.name,
      email: user.email.toString(),
      role: user.role,
    }
  }
}
