import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ProductService } from '../service/product'
import { RouterLink } from '@angular/router';

interface ProductLists {
  name: string;
  price: number
}

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProduct {
  constructor(private productServices: ProductService) { }

  product_name = '';
  product_price = 0;
  product = {} as ProductLists

  addProduct() {
    this.product = {
      name: this.product_name,
      price: this.product_price
    }
    this.productServices.addProduct(this.product);

  }
}
