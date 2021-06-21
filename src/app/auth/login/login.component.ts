import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["javi@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: "Espere por favor!",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then((credential) => {
        Swal.close();
        console.log(credential);
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        Swal.fire("Error...", error.message, "error");
      });
  }
}
