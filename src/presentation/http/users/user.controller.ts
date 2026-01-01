import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/user/create-user/create-user.use-case";
import { CreateUserDTO } from "./createUserDTO";


@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUserUseCase) {
  }

  @Post()
  async create(@Body() dto: CreateUserDTO) {
    return this.createUser.execute(dto)
  }
}
