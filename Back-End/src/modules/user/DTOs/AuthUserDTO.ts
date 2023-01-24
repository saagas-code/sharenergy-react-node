import { IsNotEmpty, IsEmail,  } from "class-validator";


export class AuthUserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

}