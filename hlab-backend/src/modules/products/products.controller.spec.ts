import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductReqDto, ListPaginationQueryDto } from './dto';
import { Product } from './entities/product.entity';
import { getResponse, ResponseDto } from '../../common/response.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    productInfos: [
      { language: 'en', name: 'Product 1', description: 'Description 1' },
      { language: 'th', name: 'Product 2', description: 'Description 2' },
    ],
  } as Product;

  const mockPaginationResponse = {
    products: [mockProduct],
    total: 1,
    limit: 10,
    offset: 0,
  };

  const mockProductsService = {
    create: jest.fn(),
    listPagination: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product success', async () => {
      mockProductsService.create.mockResolvedValueOnce(mockProduct);

      const createProductDto: CreateProductReqDto = {
        productInfos: [{ language: 'en', name: 'Product 1', description: 'Description 1' }],
      };

      const result = await controller.create(createProductDto);
      expect(result).toEqual(getResponse(mockProduct, 'Create Products successful'));
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto.productInfos);
    });

    it('should create a product fail', async () => {
      mockProductsService.create.mockRejectedValueOnce(new Error('Service Error'));

      const createProductDto: CreateProductReqDto = {
        productInfos: [{ language: 'en', name: 'Product 1', description: 'Description 1' }],
      };

      await expect(controller.create(createProductDto)).rejects.toThrow(
        new HttpException('Service Error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe('listPagination', () => {
    it('should return products list', async () => {
      mockProductsService.listPagination.mockResolvedValueOnce(mockPaginationResponse);

      const query: ListPaginationQueryDto = {
        language: 'en',
        name: 'Product',
        description: 'Description',
        limit: 10,
        offset: 0,
      };

      const result = await controller.listPagination(query);
      expect(result).toEqual(
        getResponse(
          {
            products: mockPaginationResponse.products,
            total: mockPaginationResponse.total,
            limit: 10,
            offset: 0,
          },
          'Search Products successful',
        ),
      );
    });
  });
});
