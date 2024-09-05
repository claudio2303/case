import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {
 /**
  * Pipe utilzado para pegar um valor e utilizar suas as iniciais para criar valor para ser exibidos nos cards
  * @param value string utilizada para fazer a conversão em iniciais
  * @returns 
  */
  transform(value: any): string {
    const word = value.split(' ');
    const initial = word.length > 1 ? `${word[0].charAt(0)}${word[1].charAt(0)}` : `${word[0].charAt(0)}${word[0].charAt(1)}`
    return initial.toUpperCase();
  }
}
