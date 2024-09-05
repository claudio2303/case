import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryEnum } from '../../../../shared/_interfaces/category.enum';
import { ProductService } from '../../../../shared/_services/product.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let service: ProductService;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {isAddProduct : true} },
        { provide: MatDialogRef, useValue: {} },
        ProductService
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should edit product', () => {
    fixture.detectChanges();

    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    component.formAction.get('code')?.setValue('12');
    component.formAction.get('name')?.setValue('Teste');
    component.formAction.get('category')?.setValue(CategoryEnum.WHOLESALE);
    component.data.isAddProduct = false;
    component.productAction();
    expect(service.getProducts().find(product => product.code === '12')).toEqual({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Teste'
    });
  });
  it('should add new product', () => {
    fixture.detectChanges();

    component.formAction.get('code')?.setValue('12');
    component.formAction.get('name')?.setValue('Teste');
    component.formAction.get('category')?.setValue(CategoryEnum.WHOLESALE);
    component.productAction();
    expect(service.getProducts().length).toBe(1);
  });
  it('should check code validation', () => {
    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    component.data.isAddProduct = true;
    fixture.detectChanges();
    component.formAction.get('code')?.setValue('12');
    component.formAction.get('name')?.setValue('Teste');
    component.formAction.get('category')?.setValue(CategoryEnum.WHOLESALE);
    component.productAction();
    expect(service.getProducts().find(product => product.code === '12')).toEqual({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    });
  });
  it('should create in edit page', () => {
    component.data.isAddProduct = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
});
describe('ProductFormComponent when isAddProduct is false', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {isAddProduct : false} },
        { provide: MatDialogRef, useValue: {} },
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
