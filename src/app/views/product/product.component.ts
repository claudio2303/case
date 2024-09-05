import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/_components/header/header.component';
import { PipeModule } from '../../shared/_pipes/pipe.module';
import { CategoryEnum } from '../../shared/_interfaces/category.enum';
import { SelectInterface } from '../../shared/_interfaces/select.interface';
import { ProductService } from '../../shared/_services/product.service';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from './modals/product-form/product-form.component';
import { ProductInterface } from '../../shared/_interfaces/product.interface';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { InitialsPipe } from '../../shared/_pipes/initials.pipe';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    PipeModule, 
    MatButtonModule,
    MatDialogModule,
    InitialsPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  searchForm!: FormGroup;
  categories: SelectInterface[] = [
    { value: '', viewValue: 'Todos' },
    { value: CategoryEnum.INTERNATIONAL, viewValue: CategoryEnum.INTERNATIONAL },
    { value: CategoryEnum.RETAIL, viewValue: CategoryEnum.RETAIL },
    { value: CategoryEnum.WHOLESALE, viewValue: CategoryEnum.WHOLESALE }
  ]
  constructor(
    protected productService: ProductService,
    public dialog: MatDialog,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();

  }
  buildForm() {
    this.searchForm = this.fb.group({
      name: [''],
      category: [''],
    })
  }

  public deleteProduct(code: string) {
    this.productService.deleteProduct(code);
  }
  /**
   * 
   * @param isAddProduct parametro boolean para verificar se é criação do produto ou edição
   * @param product produto selecionado da lista, em caso de edição
   */
  openDialog(isAddProduct: boolean, product?: ProductInterface) {
    this.dialog.open(ProductFormComponent,
      {
        data: {isAddProduct, product}
      }
    );
  }
  deleteConfirmation(code: string): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteProduct(code)
      }
    });
  }

}
