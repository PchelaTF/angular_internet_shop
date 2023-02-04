import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
    form!: FormGroup
    product!: IProduct
    submitted = false

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => {
                return this.productService.getById(params['id'])
            })
        ).subscribe({
            next: (product) => {
                this.product = product
                this.form = new FormGroup({
                    type: new FormControl(this.product.type, Validators.required),
                    title: new FormControl(this.product.title, Validators.required),
                    photo: new FormControl(this.product.photo, Validators.required),
                    info: new FormControl(this.product.info, Validators.required),
                    price: new FormControl(this.product.price, Validators.required),
                })
                console.log(this.form)

            },
            error: (e) => console.error(e),
        })
    }

    get type() {
        return this.form.controls['type'] as FormControl
    }

    get title() {
        return this.form.controls["title"] as FormControl
    }

    get photo() {
        return this.form.controls['photo'] as FormControl
    }

    get info() {
        return this.form.controls['info'] as FormControl
    }

    get price() {
        return this.form.controls['price'] as FormControl
    }

    submit() {
        if (this.form.invalid) return

        this.submitted = true

        this.productService.update({
            ...this.product,
                type: this.form.value.type,
                title: this.form.value.title,
                photo: this.form.value.photo,
                info: this.form.value.info,
                price: this.form.value.price,
                date: new Date()
        }).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
            complete: () => {
                this.submitted = false
                this.router.navigate(['/admin','dashboard'])
            }
        })
    }
}
