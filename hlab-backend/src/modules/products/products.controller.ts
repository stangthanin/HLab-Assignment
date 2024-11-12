import { getResponse, ResponseDto } from '../../common/response.dto';
import { ProductsService } from './products.service';
import { Controller, Get, Post, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductReqDto, ListPaginationProductResDto, ListPaginationQueryDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() { productInfos }: CreateProductReqDto): Promise<ResponseDto<Product>> {
    try {
      const data = await this.productsService.create(productInfos);

      return getResponse(data, 'Create Products successful');
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async listPagination(
    @Query() query: ListPaginationQueryDto,
  ): Promise<ResponseDto<ListPaginationProductResDto>> {
    const { language, name, description, limit, offset } = query;

    const { products, total } = await this.productsService.listPagination({
      language,
      name,
      description,
      limit,
      offset,
    });

    return getResponse({ products, total, limit, offset }, 'Search Products successful');
  }
}
