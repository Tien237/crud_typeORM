import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

interface ProductParams {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  status: boolean;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async index() {
    return { message: 'hello', data: await this.productService.getAll() };
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    return { message: 'Data', data: await this.productService.getDetail(id) };
  }

  @Post()
  async create(@Body() body: ProductParams) {
    return { message: 'Data', data: await this.productService.createProduct(body) };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductParams) {
    return { message: 'Updated successfully', data: await this.productService.updateProduct(id, body) };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
    return { message: 'Deleted successfully' };
  }
}
