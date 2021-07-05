import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo: string = "ingreso";

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      description: ["", Validators.required],
      monto: ["", Validators.required],
    });
  }

  guardar() {
    if (this.ingresoForm.invalid) return;
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
      })
      .catch((err) => Swal.fire("Ocurrio un Error", err.message, "error"));
  }
}
