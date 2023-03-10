import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "./interfaces";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

    transform(products: IProduct[], type = ''): any {
        return products.filter( product => {
            return product.type == type
        })
    }

}
