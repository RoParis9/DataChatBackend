import { UserRepository } from "src/domain/repositories/user.repository";
import { DepartmentId } from "src/domain/value-objects/DepartmentId";
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
    const requesterId = UserId.fromString(input.requesterId);
    const departmentId = DepartmentId.fromString(input.departmentId);

    const requester = await this.userRepository.findById(requesterId);

    if (!requester) {
      throw new UserNotfoundError();
    }

    const canList =
      requester.isAdmin() ||
      requester.isCompanyOwner() ||
      (requester.isDepartmentManager() &&
        requester.belongsToDepartment(departmentId));

    if (!canList) {
      throw new ForbiddenError();
    }

    const users = await this.userRepository.findByDepartmentId(departmentId);

    return {
      users: users.map(user => ({
        id: user.id.value,
        name: user.name,
        email: user.email.toString(),
        role: user.role
      }))
    };
  }
}
