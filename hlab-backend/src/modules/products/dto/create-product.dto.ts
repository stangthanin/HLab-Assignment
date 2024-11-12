import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { ProductInfoDto } from './product.dto';

export class CreateProductReqDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductInfoDto)
  productInfos: ProductInfoDto[];
}
