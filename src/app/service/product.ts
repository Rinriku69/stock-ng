import { Injectable } from '@angular/core';
import { ProductLists } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product_api = '/products.json'
  products: ProductLists[] = [];

  constructor(private http: HttpClient) { };


  /* private saveToStorage() {
    localStorage.setItem('local_product', JSON.stringify(this.products))
  } //stringify ทำให้object/array กลายเป็นstringโง่ๆ 
  // เพราะlocalstorageเก็บได้แต่string '[{obj}]' เรียกว่าการ Serialization */

  /* private loadFromStorage() {
    const data = localStorage.getItem('local_product')
    return data ? JSON.parse(data) : null
  } //.parse แปลงข้อความโง่ๆกลับมาเป็นarray/object เรียกว่า Deserialization
 */
  getProduct(): Observable<ProductLists[]> {

    return this.http.get<ProductLists[]>(this.product_api);
  }

  addProduct(product: ProductLists) {
    this.products.push(product)
    // this.saveToStorage()
  }

  removeProduct(index: number) {
    this.products.splice(index, 1)
    // this.saveToStorage()
  }

  loadProduct() {

    return this.http.get<ProductLists[]>(this.product_api);
  }

}