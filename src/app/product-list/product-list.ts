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

  search_key$ = new BehaviorSubject<string>('');
  search_status$!: Observable<string>;
  products$!: Observable<ProductLists[]>;

  filteredProducts$!: Observable<ProductLists[]>;
  dashboard$!: Observable<{ total_qty: number; total_price: number }>;


  constructor(private productServices: ProductService) {

    this.productServices.getProduct();
    this.products$ = this.productServices.stock_product$
    this.filteredProducts$ = combineLatest([this.products$,
    this.search_key$]).pipe(map(([products, key]: [ProductLists[], string]) =>
      products.filter(p =>
        p.name.toLowerCase().includes(key.toLowerCase())
      )));
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


  removeProduct(index: number) {
    this.productServices.removeProduct(index)

  }


  onSearch(value: string) {
    this.search_key$.next(value);

  }

  load() {
    this.productServices.getProduct();
  }

}
