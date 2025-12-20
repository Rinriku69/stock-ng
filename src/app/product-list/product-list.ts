import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product'
import { ProductLists } from '../models/product';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  // products: ProductLists[] = []
  search_key$ = new BehaviorSubject<string>('');
  search_status$!: Observable<string>;
  products$!: Observable<ProductLists[]>;
  // products$ = this.productServices.stock_product$
  filteredProducts$!: Observable<ProductLists[]>;
  dashboard$!: Observable<{ total_qty: number; total_price: number }>;
  /* dashboard$ = this.filteredProducts$.pipe(
    map(products => {

      const total_qty = products.reduce(
        (result, p) => result + p.qty, 0
      );

      const total_price = products.reduce(
        (result, p) => result + p.price, 0
      );

      return { total_qty, total_price };
    }) 
  )*/
  // products$ = this.productServices.stock_product$;

  constructor(private productServices: ProductService) {
    // this.products$ = this.productServices.getProduct()
    this.productServices.getProduct();
    this.products$ = this.productServices.stock_product$
    this.filteredProducts$ = combineLatest([this.products$,
    this.search_key$]).pipe(map(([products, key]: [ProductLists[], string]) =>
      products.filter(p =>
        p.name.toLowerCase().includes(key.toLowerCase())
      )));

    this.recalculate_dashboard()
  }


  removeProduct(index: number) {
    this.productServices.removeProduct(index)
    this.recalculate_dashboard()
  }

  /* load() {

    this.filteredProducts$ = this.products$
    this.recalculate_dashboard()

  } */

  recalculate_dashboard() {
    this.dashboard$ = this.filteredProducts$.pipe(
      map(products => {

        const total_qty = products.reduce(
          (result, p) => result + p.qty, 0
        );

        const total_price = products.reduce(
          (result, p) => result + p.price, 0
        );

        return { total_qty, total_price };
      })
    )

    this.search_status$ = this.filteredProducts$.pipe(
      map(products => {
        return `${products.length} results found`
      })
    )
  }


  /* onSearch() {
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
    // this.search_key$.next(this);
  
  } */



  onSearch(value: string) {
    this.search_key$.next(value);

  }
}
