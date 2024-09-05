import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryEnum } from '../../../../shared/_interfaces/category.enum';
import { SelectInterface } from '../../../../shared/_interfaces/select.interface';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../../../../shared/_services/product.service';
import { ProductInterface } from '../../../../shared/_interfaces/product.interface';
interface ProductModalInterface {
  isAddProduct: boolean,
  product: ProductInterface
}
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  actionType = 'Criar';
  formAction!: FormGroup;
  categories: SelectInterface[] = [
    { value: CategoryEnum.INTERNATIONAL, viewValue: CategoryEnum.INTERNATIONAL },
    { value: CategoryEnum.RETAIL, viewValue: CategoryEnum.RETAIL },
    { value: CategoryEnum.WHOLESALE, viewValue: CategoryEnum.WHOLESALE }
  ];
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalInterface,
    private readonly productService: ProductService
  ) {
    this.actionType = data.isAddProduct ? 'Criar' : 'Editar';
  }
  ngOnInit(): void {
    this.buildForm();
    if (!this.data.isAddProduct) {
      this.formAction.patchValue(this.data.product);
    }
  }
  buildForm() {
    this.formAction = this.fb.group({
      code: [{ value: '', disabled: !this.data.isAddProduct }, [Validators.required, this.codeValidator.bind(this), Validators.maxLength(8)]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      category: ['', [Validators.required,]]
    })
  }
  productAction() {

    if (this.data.isAddProduct) {
      this.productService.addProduct(this.formAction.value);
    } else {
      this.productService.editProduct(this.formAction.getRawValue());
    }
  }
  codeValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const alreadyHaveProduct = this.productService.checkCode(control.value);
      if (!alreadyHaveProduct) {
        return null;
      }
      return {
        existProduct: true
      }
    }
    return null;
  }

}
