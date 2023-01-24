import { Transform } from "class-transformer";
import { MinLength, MaxLength, IsNumber,  IsEmail, IsString, IsBoolean, IsOptional, isDefined, IsDefined  } from "class-validator";
import { toBoolean, toNumber } from "src/common/helpers/cast.helper";



export class CreateClientDTO {
  @IsString()
  name: string;
  
  @IsString()
  @IsEmail()
  email: string;
  
  @MinLength(11)
  @MaxLength(13)
  phone: string

  @IsString()
  address: string;


  @MinLength(11)
  @MaxLength(11)
  cpf: string;
}