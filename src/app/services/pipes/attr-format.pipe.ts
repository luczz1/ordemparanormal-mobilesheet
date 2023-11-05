import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attrFormat',
})
export class AttrFormatPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'agility':
        return 'Agilidade';
      case 'strength':
        return 'Força';
      case 'intellect':
        return 'Intelecto';
      case 'presence':
        return 'Presença';
      case 'stamina':
        return 'Vigor';
      default:
        return value;
    }
  }
}
