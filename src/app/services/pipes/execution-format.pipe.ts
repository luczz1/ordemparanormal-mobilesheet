import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executionFormat',
})
export class ExecutionFormatPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Ação Livre';
      case 2:
        return 'Reação';
      case 3:
        return 'Ação Padrão';
      case 4:
        return 'Ação Completa';
      default:
        return 'Inválido';
    }
  }
}
