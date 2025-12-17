import { Injectable } from '@angular/core';

interface ProductLists {
  name: string;
  price: number
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductLists[] = [];

  getProduct() {
    this.products = [
      { name: 'Gaming Mouse', price: 1500 },
      { name: 'Mechanical Keyboard', price: 3200 },
      { name: 'Monitor 24"', price: 4500 },
      { name: 'Mouse Pad', price: 300 },
      { name: 'Pad thai', price: 200 }
    ]

    return this.products
  }

  addProduct(product: ProductList) {
    this.products.push(product)
  }

  removeProduct(index: number) {
    this.products.splice(index, 1)
  }

}