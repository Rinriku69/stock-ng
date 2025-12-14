import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {

  products: Product[] = [];

  load() {
    this.products = [
      { name: 'Gaming Mouse', price: 1500 },
      { name: 'Mechanical Keyboard', price: 3200 },
      { name: 'Monitor 24"', price: 4500 },
      { name: 'Mouse Pad', price: 300 }
    ];
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
  }
}
