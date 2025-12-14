import { Routes } from '@angular/router';
import { HelloWorld } from './hello-world/hello-world';
import { ProductList } from './product-list/product-list';

export const routes: Routes = [
    { path: '', redirectTo: 'product-list', pathMatch: 'full' },
    { path: 'hello-world', component: HelloWorld },
    { path: 'product-list', component: ProductList}
];
