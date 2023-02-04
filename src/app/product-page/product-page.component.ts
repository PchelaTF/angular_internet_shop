import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from '../shared/product.service';
import {IProduct} from "../shared/interfaces";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<{ id: string; date: Date; info: string; photo: string; price: string; title: string; type: string; }> | undefined

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getById(params['id'])
      }))
  }

    addProduct(product: IProduct) {
        this.productService.addProduct(product)
    }
}
