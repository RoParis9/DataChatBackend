import { PasswordHasher } from "src/application/ports/Password-hasher"
import { UserRole } from "src/domain/Enums/user-roles"
import { UserRepository } from "src/domain/repositories/user.repository"
import { CreateUserUseCase } from "./create-user.use-case"

describe("CreateUserUseCase", () => {
  let useCase: CreateUserUseCase
  let userRepository: jest.Mocked<UserRepository>
  let passwordHasher: jest.Mocked<PasswordHasher>

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findByCompanyId: jest.fn(),
      findByDepartmentId: jest.fn(),
      delete: jest.fn(),
      updateUser: jest.fn()
    }

    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn()
    }

    useCase = new CreateUserUseCase(userRepository, passwordHasher)

  })


  it("should create a company owner user", async () => {
    userRepository.findByEmail.mockResolvedValue(null)
    passwordHasher.hash.mockResolvedValue("hashed-password")

    const input = {
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
      role: UserRole.COMPANY_OWNER,
      companyId: "company-1"
    }

    const result = await useCase.execute(input)


    expect(passwordHasher.hash).toHaveBeenCalledWith("123456")
    expect(userRepository.save).toHaveBeenCalledTimes(1)

    expect(result).toEqual({
      id: expect.any(String),
      email: "john@email.com",
      role: UserRole.COMPANY_OWNER
    })
  })

  it("should throw if user already exists", async () => {
    userRepository.findByEmail.mockResolvedValue({} as any);

    const input = {
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
      role: UserRole.COMPANY_OWNER,
      companyId: "company-1",
    };

    await expect(useCase.execute(input)).rejects.toThrow("User already exists")

    expect(userRepository.save).not.toHaveBeenCalled()
  })



  it("should require department for employee", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const input = {
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
      role: UserRole.EMPLOYEE,
      companyId: "company-1",
    };

    await expect(useCase.execute(input)).rejects.toThrow("Department is required for this role")

    expect(userRepository.save).not.toHaveBeenCalled()
  })

  it("should require department for department manager", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const input = {
      name: "Jane Doe",
      email: "jane@email.com",
      password: "123456",
      role: UserRole.DEPARTMENT_MANAGER,
      companyId: "company-1",
    };

    await expect(useCase.execute(input))
      .rejects
      .toThrow("Department is required for this role");
  });

})
