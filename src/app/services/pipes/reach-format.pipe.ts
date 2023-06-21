import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reactFormat',
})
export class ReachFormatPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Pessoal';
      case 2:
        return 'Toque';
      case 3:
        return 'Curto (9m)';
      case 4:
        return 'Médio (16m)';
      case 5:
        return 'Longo (32m)';
      case 6:
        return 'Extremo (90m)';
      case 7:
        return 'Ilimitado';
      default:
        return 'Inválido';
    }
  }
}
