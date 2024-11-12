import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductInfo, productInfo => productInfo.product, { cascade: true })
  productInfos: ProductInfo[];
}

@Entity()
export class ProductInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, product => product.productInfos)
  product: Product;
}
