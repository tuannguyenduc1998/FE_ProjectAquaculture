import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../models/master-data/area.model';
import { PagePagination } from '../models/master-data/pagePanigation.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(areaPagePagination: Area[], searchValue: string): Area[] {
    
    if(!areaPagePagination || !searchValue) {
      return areaPagePagination;
    }
    return areaPagePagination.filter(area => 
      area.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
