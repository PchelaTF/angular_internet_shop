import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  products: IProduct[] = []
  productSub!: Subscription
  removeSub!: Subscription
    productName!: string

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productSub = this.productService.getAll().subscribe({
      next: (products) => this.products = products,
      error: (e) => console.error(e),
      complete: () => console.log(this.products)
    })
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe()
    }

    if (this.removeSub) {
      this.productSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.removeSub = this.productService.remove(id).subscribe({
      next: () => this.products = this.products.filter(product => product.id !== id)
    })
  }
}
