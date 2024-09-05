import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { AppComponent } from '../../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/_services/product.service';
import { CategoryEnum } from '../../shared/_interfaces/category.enum';
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent, BrowserAnimationsModule],
      providers: [
        ProductService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductComponent);
    service = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete product', () => {
    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    component.deleteProduct('12')
    expect(service.getProducts().length).toBe(0);
  });
  it('should open modal form action', () => {
    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    const openDialogSpy = spyOn(component.dialog, 'open')
    component.openDialog(true)
    expect(openDialogSpy).toHaveBeenCalled();
  });
  it('should open modal confirm exclusion', () => {
    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    const openDialogSpy = spyOn(component.dialog, 'open').and
    .returnValue({
        afterClosed: () => of(true)
    } as MatDialogRef<typeof component>);
    component.deleteConfirmation('12');
    expect(openDialogSpy).toHaveBeenCalled();
  });
  it('should test search', () => {
    service.addProduct({
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    })
    component.searchForm.get('name')?.setValue('we')
    expect(service.getProducts().length).toBe(1);
  });
});
