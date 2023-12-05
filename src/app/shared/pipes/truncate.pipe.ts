import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {


  transform(value: string): string {
    if (value && value.length > 1000) {
      return `${value.slice(0, 1000)}...`;
    }
    return value;
  }

}
