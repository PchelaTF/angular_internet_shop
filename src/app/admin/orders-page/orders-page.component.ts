import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/order.service";
import {IObjectKeysOrders, IOrder} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{
    orders: IOrder[] = []
    orderSub!: Subscription
    removeSub!: Subscription
    productName!: string

    constructor(
        private orderService: OrderService
    ) {
    }

    ngOnInit(): void {
        this.orderSub = this.orderService.getAll().subscribe({
            next: (orders) => this.orders = orders,
            error: (e) => console.error(e),
            complete: () => console.log(this.orders)
        })
    }

    ngOnDestroy() {
        if (this.orderSub) {
            this.orderSub.unsubscribe()
        }

        if (this.removeSub) {
            this.orderSub.unsubscribe()
        }
    }

    remove(id: string) {
        this.removeSub = this.orderService.remove(id).subscribe({
            next: () => this.orders = this.orders.filter(orders => orders.id !== id)
        })
    }
}
