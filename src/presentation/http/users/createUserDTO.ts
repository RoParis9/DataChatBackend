import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "src/domain/Enums/user-roles";


export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  password: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsEnum(UserRole)
  role: UserRole;

}
