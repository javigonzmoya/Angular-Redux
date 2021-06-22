import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth.service";
import * as ui from "src/app/shared/ui.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubcription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
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

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    /*  Swal.fire({
      title: "Espere por favor!",
      didOpen: () => {
        Swal.showLoading();
      },
    }); */

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then((credential) => {
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Error...", error.message, "error");
      });
  }
}
