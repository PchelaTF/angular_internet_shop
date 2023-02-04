import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  products$: Observable<{ id: string; date: Date; info: string; photo: string; price: string; title: string; type: string; }[]> | undefined

  constructor(
      public productService: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getAll()
  }

}
