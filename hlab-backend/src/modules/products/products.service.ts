import { Injectable } from '@nestjs/common';
import { Product, ProductInfo } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListProductQuery } from './model/product.model';
import { ListPaginationProductDto, ProductInfoDto } from './dto';
import { escapeWildcardCharacter } from '../../utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productInfoDtos: ProductInfoDto[]): Promise<Product> {
    const product = new Product();
    product.productInfos = productInfoDtos.map(productInfoDto => {
      return {
        language: productInfoDto.language,
        name: productInfoDto.name,
        description: productInfoDto.description,
      } as ProductInfo;
    });

    return await this.productRepository.save(product);
  }

  async listPagination({
    language,
    name,
    description,
    limit,
    offset,
  }: ListProductQuery): Promise<ListPaginationProductDto> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo');

    if (language) {
      query.andWhere('productInfo.language = :language', { language });
    }

    if (name) {
      query.andWhere('productInfo.name ILIKE :name', {
        name: name ? `%${escapeWildcardCharacter(name)}%` : undefined,
      });
    }

    if (description) {
      query.andWhere('productInfo.description ILIKE :description', {
        description: description ? `%${escapeWildcardCharacter(description)}%` : undefined,
      });
    }

    query.skip(offset).take(limit);

    const [products, total] = await query.getManyAndCount();

    return {
      products,
      total,
    };
  }
}
