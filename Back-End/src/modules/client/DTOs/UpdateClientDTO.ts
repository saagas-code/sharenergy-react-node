import { Transform } from "class-transformer";
import { MinLength, MaxLength,  IsEmail, IsString, IsOptional  } from "class-validator";
import { trim } from '../../../common/helpers/cast.helper';





export class UpdateClientDTO {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @Transform(({value}) => trim(value))
  name: string;
  
  @IsString()
  @IsEmail()
  @IsOptional()
  @MinLength(4)
  @Transform(({value}) => trim(value))
  email: string;
  
  @MinLength(11)
  @MaxLength(13)
  @IsOptional()
  @Transform(({value}) => trim(value))
  phone: string

  @IsString()
  @IsOptional()
  @MinLength(4)
  @Transform(({value}) => trim(value))
  address: string;


  @MinLength(11)
  @MaxLength(11)
  @IsOptional()
  @Transform(({value}) => trim(value))

  cpf: string;
}