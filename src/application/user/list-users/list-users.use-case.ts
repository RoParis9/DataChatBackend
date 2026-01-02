import { UserRepository } from "src/domain/repositories/user.repository";
import { ListUserInput } from "./list-users.input";
import { ListUsersOutput } from "./list-user.output";
import { UserId } from "src/domain/value-objects/UserId";
import { UserNotfoundError } from "../errors/user-not-found.error";
import { ForbiddenError } from "../errors/forbidden.error";

export class ListUserUseCase {
  constructor(
    private readonly userRepository: UserRepository;
  ) {}
  async execute(input: ListUserInput): Promise<ListUsersOutput> {
    const requesterId = new UserId(input.requesterId)

    const requester = await this.userRepository.findById(requesterId)

    if (!requester) {
      throw new UserNotfoundError()
    }

    if (!requester.isManager() && !requester.isAdmin()) {
      throw new ForbiddenError()
    }

    const users = await this.userRepository.findByCompanyId(requester.companyId)

    return {
      users: users.map(user => ({
        id: user.id.value,
        name: user.name,
        email: user.email.toString(),
        role: user.role
      }))
    }

  }
}
