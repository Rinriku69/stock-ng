import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product'
import { AddProduct } from "../add-product/add-product";

interface ProductLists {
  name: string;
  price: number
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, AddProduct],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  products: ProductLists[] = []

  constructor(private productServices: ProductService) {
    this.products = this.productServices.getProduct();

  }
  removeProduct(index: number) {
    this.productServices.removeProduct(index);
  }

  load() {
    this.products = this.productServices.getProduct();
  }


}
