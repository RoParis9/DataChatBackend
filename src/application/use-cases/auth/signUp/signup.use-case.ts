import { PasswordHasher } from "src/application/ports/Password-hasher"
import { TokenGenerator } from "src/application/ports/token-generator"
import { UserRole } from "src/domain/Enums/user-roles"
import { Company } from "src/domain/entities/company.entity"
import { User } from "src/domain/entities/user.entity"
import { CompanyRepository } from "src/domain/repositories/company.repository"
import { UserRepository } from "src/domain/repositories/user.repository"
import { CompanyId } from "src/domain/value-objects/CompanyId"
import { Email } from "src/domain/value-objects/Email"
import { PasswordHash } from "src/domain/value-objects/Password-Hash"
import { EmailAlreadyInUseError } from "../errors/EmailAlreadyInUse"
import { SignUpInput } from "./signup.input"
import { SignUpOutput } from "./signup.output"

export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(input: SignUpInput): Promise<SignUpOutput> {
    const email = new Email(input.email)

    const emailInUse = await this.userRepository.findByEmail(email)
    if (emailInUse) {
      throw new EmailAlreadyInUseError()
    }

    const hashedPassword = await this.passwordHasher.hash(input.password)

    const passwordHash = PasswordHash.fromHash(hashedPassword)

    let companyId: CompanyId
    let role: UserRole

    if (input.isCompanyOwner) {
      if (!input.companyName) {
        throw new Error("Company name is required")
      }

      const company = Company.create(input.companyName)
      await this.companyRepository.save(company)

      companyId = company.id
      role = UserRole.COMPANY_OWNER
    } else {
      if (!input.companyId) {
        throw new Error("CompanyId is required")
      }

      if (!input.role) {
        throw new Error("Invalid Role")
      }
      companyId = CompanyId.fromString(input.companyId)
      role = input.role
    }


    const user = User.create({
      name: input.name,
      email,
      passwordHash,
      role,
      companyId
    })

    await this.userRepository.save(user)


    const acessToken = this.tokenGenerator.generateAcessToken({
      sub: user.id.value,
      role: user.role,
      companyId: user.companyId.value
    })

    return {
      user: {
        id: user.id.value,
        name: user.name,
        email: user.email.toString(),
        role: user.role,
        companyId: user.companyId.value
      },
      acessToken
    }
  }
}
