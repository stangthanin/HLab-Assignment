import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProductDto {
  id: number;
  productInfos: ProductInfoDto[];
}

export class ProductInfoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  language: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description?: string;
}
