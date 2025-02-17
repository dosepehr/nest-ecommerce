import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  category: number;
}
