import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent {
  form = new FormGroup({
    type: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    photo: new FormControl(null, Validators.required),
    info: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  })
  submitted = false

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  get type() {
    return this.form.controls.type as FormControl
  }

  get title() {
    return this.form.controls.title as FormControl
  }

  get photo() {
    return this.form.controls.photo as FormControl
  }

  get info() {
    return this.form.controls.info as FormControl
  }

  get price() {
    return this.form.controls.price as FormControl
  }

  submit() {
    if (this.form.invalid) return

    this.submitted = true

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }

    this.productService.create(product).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.error(e),
      complete: () => {
        this.form.reset()
        this.submitted = false
        this.router.navigate(['/admin','dashboard'])
      }
    })
  }
}
