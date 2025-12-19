import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product'
import { ProductLists } from '../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  products: ProductLists[] = []
  search_key = ''
  search_status: number | string = 'Show all results';
  filteredProducts: ProductLists[] = [];
  total_qty = 0;
  total_price = 0;

  constructor(private productServices: ProductService) {
    this.productServices.getProduct().subscribe((data) => {
      // โค้ดในนี้จะทำงานเมื่อ "โหลดเสร็จ" เท่านั้น
      this.products = data;
      this.filteredProducts = data; // เอาของใส่ถังโชว์
      this.recalculate_dashboard();           // คำนวณ Dashboard ใหม่
      console.log('โหลดข้อมูลเสร็จแล้วจ้า!', data);
    });
  }
  removeProduct(index: number) {
    this.productServices.removeProduct(index);
    this.recalculate_dashboard()
  }

  load() {
    this.productServices.loadProduct().subscribe((data) => {
      this.products = data
      this.filteredProducts = data
      this.recalculate_dashboard()
    });
  }

  recalculate_dashboard() {
    this.total_qty = this.products.length
    this.total_price = this.products.reduce(
      (result, initial) => {
        return result + initial.price
      }, 0);
  }


  products_list() {
    if (
      this.search_key === ''

    ) {
      this.search_status = 'Show all results'
      return this.filteredProducts = this.products
    } else {
      const found: ProductLists[] = []
      this.products.forEach((p) => {
        if (p.name?.toLowerCase().includes(this.search_key.toLowerCase())) {
          found.push(p)
        }
      });
      if (found.length > 0) {
        this.search_status = found.length + ' results found'
      } else {
        this.search_status = '0 results found'
      }
      return found ? this.filteredProducts = found : this.products
    }
  }


}
