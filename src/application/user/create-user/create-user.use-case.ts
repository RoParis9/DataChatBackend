import { randomUUID } from "crypto";
import { PasswordHasher } from "src/application/ports/PasswordHasher";
import { User } from "src/domain/entities/user.entity";
import { UserRepository } from "src/domain/repositories/user.repository";
import { CompanyId } from "src/domain/value-objects/CompanyId";
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

    const passwordHash = await this.passwordHasher.hash(input.password)

    const user = new User(
      new UserId(randomUUID()),
      new CompanyId(input.companyId),
      input.name,
      email,
      PasswordHash.fromHash(passwordHash),
      input.role,
      new Date()
    )

    await this.userRepository.save(user)

    return {
      id: user.id.value,
      email: user.email.toString(),
      role: user.role
    }
  }

}
