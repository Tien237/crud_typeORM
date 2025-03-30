import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductParams } from './products.controller';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getDetail(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(params: ProductParams): Promise<Product> {
    if (!params.name || !params.price) throw new Error('Name and price are required');

    const productNew = this.productRepository.create({
      ...params,
      quantity: params.quantity ?? 0,
      status: params.status ?? true,
    });
    
    return this.productRepository.save(productNew);
  }

  async updateProduct(id: number, params: ProductParams): Promise<Product> {
    const product = await this.getDetail(id);
    Object.assign(product, params);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.getDetail(id);
    await this.productRepository.remove(product);
  }
}
