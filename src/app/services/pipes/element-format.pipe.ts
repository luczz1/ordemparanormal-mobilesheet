import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elementFormat',
})
export class ElementFormatPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'knowledge':
        return 'Conhecimento';
      case 'blood':
        return 'Sangue';
      case 'death':
        return 'Morte';
      case 'fear':
        return 'Medo';
      case 'energy':
        return 'Energia';
      default:
        return value;
    }
  }
}
