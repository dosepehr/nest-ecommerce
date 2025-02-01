import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  @Transform(({ value }) => value.trim())
  mobile: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
