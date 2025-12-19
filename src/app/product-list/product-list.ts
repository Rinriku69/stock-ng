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

  constructor(private productServices: ProductService) {
    this.products = this.productServices.getProduct();
    this.filteredProducts = this.products
  }
  removeProduct(index: number) {
    this.productServices.removeProduct(index);
  }

  load() {
    this.products = this.productServices.loadProduct();
    this.filteredProducts = this.products
  }

  dashBoard() {
    const TotalStock = {
      qty: this.products.length,
      total: this.products.reduce(
        (result, initial) => {
          return result + initial.price
        }, 0),
    }
    return TotalStock
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
