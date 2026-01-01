import { User } from "src/domain/entities/user.entity";
import { UserRepository } from "src/domain/repositories/user.repository";
export type CreateUserInput = {
  name: string;
  email: string;
  role: 'EMPLOYEE' | 'MANAGER';
  tenantId: string;
  departmentId?: string;
}
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository;
  ) {
  }

  async execute(input: CreateUserInput): Promise<User> {

  }

}
