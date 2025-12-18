import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ProductService } from '../service/product'
import { Router } from '@angular/router';
import { ProductLists } from '../models/product';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProduct {
  constructor(private productServices: ProductService, private router: Router) { }

  product_name = '';
  product_price = 0;
  product_qty = 0;
  product = {} as ProductLists


  addProduct() {
    this.product = {
      name: this.product_name,
      price: this.product_price,
      qty: this.product_qty,
    }
    this.productServices.addProduct(this.product);
    this.router.navigate(['/product-list'])
  }
}
