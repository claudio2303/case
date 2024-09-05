import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Lista Produtos',
        loadComponent: () => import('./views/product/product.component').then(c => c.ProductComponent)
    },
    {
        path: '**',
        redirectTo: ''
    },
];
