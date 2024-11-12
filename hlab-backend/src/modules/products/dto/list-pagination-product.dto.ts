import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

export class ListPaginationQueryDto {
  @IsOptional()
  language: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  limit: number = 10;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;
}

export class ListPaginationProductDto {
  products: ProductDto[];
  total: number;
}

export class ListPaginationProductResDto extends ListPaginationProductDto {
  limit: number;
  offset: number;
}
