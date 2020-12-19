import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateWord'
})
export class TruncateWordPipe implements PipeTransform {

    transform(value: string, word: number): string {
        let result = value || '';

        // if (value) {
        //     result = value.length < limit ? value : value.slice(0, limit) + '...';
        // }
        let count = 0;
        const space = ' ';
        if (value) {
            for (let i = 0; i <= value.length; i++) {
                if (value[i] === space) {
                    count += 1;
                }
                if (count === word - 1) {
                    result = value.slice(0, i + 1) + '...';
                }
            }
        }

        return result;
    }
}
