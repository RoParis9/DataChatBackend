import { randomUUID } from "crypto";
import { PasswordHasher } from "src/application/ports/Password-hasher";
import { User } from "src/domain/entities/user.entity";
import { UserRole } from "src/domain/Enums/user-roles";
import { UserRepository } from "src/domain/repositories/user.repository";
import { CompanyId } from "src/domain/value-objects/CompanyId";
import { DepartmentId } from "src/domain/value-objects/DepartmentId";
import { Email } from "src/domain/value-objects/Email";
import { PasswordHash } from "src/domain/value-objects/Password-Hash";
import { UserId } from "src/domain/value-objects/UserId";
import { CreateUserInput } from "./create-user.input";
import { CreateUserOutput } from "./create-user.output";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {
  }

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const email = new Email(input.email)

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists")
    }

    if (
      (input.role === UserRole.DEPARTMENT_MANAGER ||
        input.role === UserRole.EMPLOYEE) &&
      !input.departmentId
    ) {
      throw new Error("Department is required for this role")
    }

    const passwordHash = await this.passwordHasher.hash(input.password)

    const departmentId = input.departmentId ? DepartmentId.fromString(input.departmentId) : undefined
    const user = new User(
      new UserId(randomUUID()),
      new CompanyId(input.companyId),
      input.name,
      email,
      PasswordHash.fromHash(passwordHash),
      input.role,
      new Date(),
      departmentId
    )

    await this.userRepository.save(user)

    return {
      id: user.id.value,
      email: user.email.toString(),
      role: user.role
    }
  }

}
