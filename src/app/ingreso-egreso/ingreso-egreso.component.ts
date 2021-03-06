import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as ui from "src/app/shared/ui.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  uiSubcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      description: ["", Validators.required],
      monto: ["", Validators.required],
    });
    this.uiSubcription = this.store.select("ui").subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    console.log("descripcion --");
    this.uiSubcription.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    const { description, monto } = this.ingresoForm.value;
    const ingresoEgreso: IngresoEgreso = new IngresoEgreso(
      description,
      monto,
      this.tipo
    );
    this.ingresoEgresoService
      .createIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.ingresoForm.reset();
        Swal.fire("Registro creado", description, "success");
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        Swal.fire("Ocurrio un Error", err.message, "error");
        this.store.dispatch(ui.stopLoading());
      });
  }
}
