import { UserRepository } from "src/domain/repositories/user.repository";
import { ForbiddenError } from "../errors/forbidden.error";
import { UserNotfoundError } from "../errors/user-not-found.error";
import { DeleteUserInput } from "./delete-user.input";
import { DeleteUserOutput } from "./delete-user.output";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const requester = await this.userRepository.findById(input.requesterId)

    if (!requester) {
      throw new UserNotfoundError()
    }

    const targetUser = await this.userRepository.findById(input.targetUserId)

    if (!targetUser) {
      throw new UserNotfoundError()
    }

    if (requester.id.equals(targetUser.id)) {
      throw new ForbiddenError("You cannot delete yourself")
    }

    if (requester.isAdmin()) {
      await this.userRepository.delete(targetUser)
      return { sucess: true }
    }

    if (
      requester.isCompanyOwner() &&
      requester.companyId.equals(targetUser.companyId)
    ) {
      await this.userRepository.delete(targetUser)
      return { sucess: true }
    }

    if (
      requester.isDepartmentManager() &&
      requester.departmentId &&
      requester.departmentId === targetUser.departmentId
    ) {
      await this.userRepository.delete(targetUser)
      return { sucess: true }
    }
    throw new ForbiddenError()
  }
}
