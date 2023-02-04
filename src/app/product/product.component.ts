import { Component, Input } from '@angular/core';
import {IProduct} from "../shared/interfaces";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: any

    constructor(
        private productService: ProductService
    ) {
    }

    addProduct(product: IProduct) {
        this.productService.addProduct(product)
    }

}
