import { computed, Injectable, signal } from '@angular/core';
import { ProductInterface } from '../_interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<ProductInterface[]>([]);
  getProducts = computed(() => this.products());

  constructor() { }
  addProduct(product: ProductInterface) {
    this.products.update(value => [...value, product]);
  }

  editProduct(product: ProductInterface) {
    this.products.update(value => {
      return value.map(p => p.code === product.code ? product : p)
    })
  }
  deleteProduct(code: string) {
    this.products.update(value => {
      const newValue = value.filter(item => item.code !== code)
      return newValue
    })
  }
  checkCode(code: string): boolean {
    const haveCode = this.products().find(product => code.toUpperCase() === product.code.toUpperCase())
    return haveCode ? true : false
  }
}
