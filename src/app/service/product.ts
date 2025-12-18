import { Injectable } from '@angular/core';
import { ProductLists } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductLists[] = this.loadFromStorage() || [
    { name: 'Gaming Mouse', price: 1500, qty: 10 },
    { name: 'Mechanical Keyboard', price: 3200, qty: 10 },
    { name: 'Monitor 24"', price: 4500, qty: 10 },
    { name: 'Mouse Pad', price: 300, qty: 10 },
    { name: 'Pad thai', price: 200, qty: 10 }
  ];

  private saveToStorage() {
    localStorage.setItem('local_product', JSON.stringify(this.products))
  } //stringify ทำให้object/array กลายเป็นstringโง่ๆ 
  // เพราะlocalstorageเก็บได้แต่string '[{obj}]' เรียกว่าการ Serialization

  private loadFromStorage() {
    const data = localStorage.getItem('local_product')
    return data ? JSON.parse(data) : null
  } //.parse แปลงข้อความโง่ๆกลับมาเป็นarray/object เรียกว่า Deserialization

  getProduct() {
    return this.products
  }

  addProduct(product: ProductLists) {
    this.products.push(product)
    this.saveToStorage()
  }

  removeProduct(index: number) {
    this.products.splice(index, 1)
    this.saveToStorage()
  }

  loadProduct() {
    this.products = [
      { name: 'Gaming Mouse', price: 1500, qty: 10 },
      { name: 'Mechanical Keyboard', price: 3200, qty: 10 },
      { name: 'Monitor 24"', price: 4500, qty: 10 },
      { name: 'Mouse Pad', price: 300, qty: 10 },
      { name: 'Pad thai', price: 200, qty: 10 }
    ];
    return this.products
  }

}