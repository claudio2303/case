import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { CategoryEnum } from '../_interfaces/category.enum';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should addProduct', () => {
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '2',
      name: 'Teste'
    })
    expect(service.getProducts().length).toBe(1);
  });
  it('should addProduct then edit', () => {
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '2',
      name: 'Teste'
    })
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '3',
      name: 'Teste'
    })
    service.editProduct({
      category: CategoryEnum.WHOLESALE,
      code: '2',
      name: 'Teste'
    })
    expect(service.getProducts().find(product => product.code === '2')).toEqual({
      category: CategoryEnum.WHOLESALE,
      code: '2',
      name: 'Teste'
    });
  });
  it('should addProduct then delete', () => {
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '2',
      name: 'Teste'
    })
    service.deleteProduct('2');
    expect(service.getProducts().length).toBe(0);
  });
  it('should check codes to not allw new creation', () => {
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '2',
      name: 'Teste'
    })
    const existProduct = service.checkCode('2');
    expect(existProduct).toBeTrue();
  });
  it('should check codes to allow new creation', () => {
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '2',
      name: 'Teste'
    })
    const existProduct = service.checkCode('3');
    service.addProduct({
      category: CategoryEnum.INTERNATIONAL,
      code: '3',
      name: 'Teste'
    })
    expect(existProduct).toBeFalse();
    expect(service.getProducts().length).toBe(2);
  });
});
