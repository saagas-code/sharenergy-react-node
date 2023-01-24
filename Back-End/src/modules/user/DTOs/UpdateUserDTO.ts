import { Transform } from "class-transformer";
import { IsEmail, IsString, IsOptional, MinLength } from "class-validator";
import { trim } from '../../../common/helpers/cast.helper';



export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @Transform(({value}) => trim(value))
  @MinLength(2)

  username?: string;
  
  @IsString()
  @IsOptional()
  @Transform(({value}) => trim(value))
  @MinLength(2)
  fullname?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @Transform(({value}) => trim(value))
  @MinLength(2)
  email?: string;

  @IsString()
  @IsOptional()
  @Transform(({value}) => trim(value))
  @MinLength(2)
  password?: string;
}