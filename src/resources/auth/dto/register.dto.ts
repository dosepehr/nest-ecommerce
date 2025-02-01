import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { normalizeMobileNumber } from 'src/utils/funcs/normalizeMobileNumber';
export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  @Transform(({ value }) => normalizeMobileNumber(value.trim()))
  mobile: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
