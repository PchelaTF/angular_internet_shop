import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  get email() {
    return this.form.controls.email as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  submit() {
    if (this.form.invalid) return

    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    // this.auth.login(user).subscribe(res => {
    //   this.form.reset
    //   this.router.navigate(['/admin','dashboard'])
    //   this.submitted = false
    // }, () => {
    //   this.submitted = false
    // })

    this.auth.login(user).subscribe({
      next: (res) => console.log(res),
      // error: (e) => console.error(e),
      error: () => this.submitted = false,
      complete: () => {
        this.form.reset
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false
      }
    })
  }
}
