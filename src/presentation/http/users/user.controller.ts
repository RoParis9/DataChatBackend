import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/user/create-user/create-user.use-case";
import { CreateUserDTO } from "./createUserDTO";


@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase
  ) {
  }

  @Post()
  async create(@Body() dto: CreateUserDTO) {
    return this.createUser.execute(dto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return this.updateUser.execute({ id, ...dto })
  }
}
