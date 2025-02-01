import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}
