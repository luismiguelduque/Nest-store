import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) { }

  async runSeed() {

    this.insertNewProducts();
    return 'Seed excecuted!';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;
    const insetPromises = [];
    products.forEach(product => {
      insetPromises.push(this.productsService.create(product));
    })
    await Promise.all(insetPromises);
    return true;
  }

}
