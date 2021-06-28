import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform {
  transform(text: string | null, findString: string, toReplace: string): string {
    if (text === null) {
      return '';
    } else {
      return text.match(findString) ? text.replace(findString, toReplace) : text;
    }
  }
}
