import { Routes } from '@angular/router';
import { HelloWorld } from './hello-world/hello-world';
import { ProductList } from './product-list/product-list';
import { AddProduct } from './add-product/add-product'

export const routes: Routes = [
    { path: '', redirectTo: 'product-list', pathMatch: 'full' },
    { path: 'hello-world', component: HelloWorld },
    { path: 'product-list', component: ProductList },
    { path: 'add-product', component: AddProduct }
];
