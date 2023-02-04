import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {IProduct} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{

    cartProducts: IProduct[] = []
    totalPrice = 0
    added = ''

    form = new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        adress: new FormControl('', Validators.required),
        payment: new FormControl('cash'),
    })

    submitted = false

    constructor(
        private productService: ProductService,
        private orderService: OrderService
    ) {
    }

    ngOnInit(): void {
        this.cartProducts = this.productService.cartProducts
        for (let i = 0; i <=this.cartProducts.length; i++) {
            this.totalPrice += Number(this.cartProducts[i].price)
        }
    }

    get name() {
        return this.form.controls.name as FormControl
    }

    get phone() {
        return this.form.controls.phone as FormControl
    }

    get adress() {
        return this.form.controls.adress as FormControl
    }

    get payment() {
        return this.form.controls.payment as FormControl
    }

    delete(product: IProduct) {
        this.totalPrice -= Number(product.price)
        this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
    }

    submit() {
        if (this.form.invalid) return

        this.submitted = true

        const order = {
            name: this.form.value.name,
            phone: this.form.value.phone,
            adress: this.form.value.adress,
            payment: this.form.value.payment,
            orders: this.cartProducts,
            price: this.totalPrice,
            date: new Date()
        }

        this.orderService.create(order).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
            complete: () => {
                this.form.reset()
                this.added = 'Delivery is framed'
                this.submitted = false
            }
        })
    }

}
