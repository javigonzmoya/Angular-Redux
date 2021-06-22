import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import * as ui from "src/app/shared/ui.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  cargando: boolean = false;
  uiSubcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["javi", Validators.required],
      email: ["javi@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });

    this.uiSubcription = this.store
      .select("ui")
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy() {
    this.uiSubcription.unsubscribe();
  }

  CrearUsuario() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    /*     Swal.fire({
      title: "Espere por favor!",
      didOpen: () => {
        Swal.showLoading();
      },
    }); */

    const { name, email, password } = this.registerForm.value;
    this.authService
      .crearUsuario(name, email, password)
      .then((credential) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Error...", error.message, "error");
      });
  }
}
