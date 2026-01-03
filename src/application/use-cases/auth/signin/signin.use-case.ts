// application/use-cases/auth/sign-in/sign-in.use-case.ts
import { PasswordHasher } from "src/application/ports/PasswordHasher";
import { TokenGenerator } from "src/application/ports/token-generator";
import { UserRepository } from "src/domain/repositories/user.repository";
import { Email } from "src/domain/value-objects/Email";
import { InvalidCredentialsError } from "../errors/InvalidCredentials";
import { SignInInput } from "./signin.input";
import { SignInOutput } from "./signin.output";

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const email = new Email(input.email);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
      user.passwordHashed.value
    );

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    const accessToken = this.tokenGenerator.generateAcessToken({
      sub: user.id.value,
      role: user.role,
      companyId: user.companyId.value
    });

    return {
      user: {
        id: user.id.value,
        name: user.name,
        email: user.email.toString(),
        role: user.role,
        companyId: user.companyId.value
      },
      accessToken
    };
  }
}
