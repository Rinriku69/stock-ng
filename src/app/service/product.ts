import { Injectable } from '@angular/core';


interface ProductLists {
  name: string;
  price: number
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductLists[] = this.loadFromStorage() || [
    { name: 'Gaming Mouse', price: 1500 },
    { name: 'Mechanical Keyboard', price: 3200 },
    { name: 'Monitor 24"', price: 4500 },
    { name: 'Mouse Pad', price: 300 },
    { name: 'Pad thai', price: 200 }
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
      { name: 'Gaming Mouse', price: 1500 },
      { name: 'Mechanical Keyboard', price: 3200 },
      { name: 'Monitor 24"', price: 4500 },
      { name: 'Mouse Pad', price: 300 },
      { name: 'Pad thai', price: 200 }
    ];
    return this.products
  }

}