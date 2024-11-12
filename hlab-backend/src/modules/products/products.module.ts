import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductInfo } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductInfo])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
