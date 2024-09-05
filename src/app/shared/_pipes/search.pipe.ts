import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from '../_interfaces/product.interface';

@Pipe({ name: 'caseFilter' })
export class CaseFilterPipe implements PipeTransform {

  /**
   * Pipe para fazer o filtro da busca por nome e categoria
   *
   * @param items lista dos produtos cadastrados
   * @param searchFields campos utilizados para a filtragem
   * @returns Lista dos produtos cadastrados filtrados
   */
  transform(items: ProductInterface[], searchFields: ProductInterface): ProductInterface[] {
    return items.filter(x => x.category.includes(searchFields.category) && x.name.toLocaleLowerCase().includes(searchFields.name.toLowerCase()));
  }
}