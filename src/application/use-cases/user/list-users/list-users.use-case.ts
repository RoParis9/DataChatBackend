import { UserRepository } from "src/domain/repositories/user.repository";
import { UserId } from "src/domain/value-objects/UserId";
import { ForbiddenError } from "../errors/forbidden.error";
import { UserNotfoundError } from "../errors/user-not-found.error";
import { ListUsersOutput } from "./list-user.output";
import { ListUserInput } from "./list-users.input";

export class ListUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
  async execute(input: ListUserInput): Promise<ListUsersOutput> {

    const requester = await this.userRepository.findById(new UserId(input.requesterId))


    if (!requester) {
      throw new UserNotfoundError()
    }

    const canList =
      requester.isAdmin() ||
      requester.isCompanyOwner() ||
      (requester.isDepartmentManager() && requester.belongsToDepartment(input.departmentId))

    if (!canList) {
      throw new ForbiddenError()
    }

    const users = await this.userRepository.findByDepartmentId(input.departmentId)

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
