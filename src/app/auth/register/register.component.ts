import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["javi", Validators.required],
      email: ["javi@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });
  }

  CrearUsuario() {
    if (this.registerForm.invalid) {
      return;
    }

    Swal.fire({
      title: "Espere por favor!",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { name, email, password } = this.registerForm.value;
    this.authService
      .crearUsuario(name, email, password)
      .then((credential) => {
        Swal.close();
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        Swal.fire("Error...", error.message, "error");
      });
  }
}
