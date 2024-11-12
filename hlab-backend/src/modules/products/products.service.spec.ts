import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductInfoDto } from './dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('create', () => {
    it('should create product', async () => {
      const productInfoDtos: ProductInfoDto[] = [
        { language: 'en', name: 'Product 1', description: 'Description 1' },
        { language: 'th', name: 'Product 2', description: 'Description 2' },
      ];

      const saveMock = jest.spyOn(productRepository, 'save').mockResolvedValueOnce(new Product());
      const result = await service.create(productInfoDtos);

      expect(saveMock).toHaveBeenCalledWith(
        expect.objectContaining({
          productInfos: expect.arrayContaining([
            expect.objectContaining({ language: 'en', name: 'Product 1' }),
            expect.objectContaining({ language: 'th', name: 'Product 2' }),
          ]),
        }),
      );
      expect(result).toBeInstanceOf(Product);
    });
  });

  describe('listPagination', () => {
    it('should return products list', async () => {
      const query = {
        language: 'en',
        name: 'Product',
        description: 'Description',
        limit: 10,
        offset: 0,
      };

      const mockProducts = [new Product()];
      const mockTotal = 1;
      const createQueryBuilder: any = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValueOnce([mockProducts, mockTotal]),
      };

      jest
        .spyOn(productRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const result = await service.listPagination(query);

      expect(result.products).toEqual(mockProducts);
      expect(result.total).toBe(mockTotal);
    });
  });
});
