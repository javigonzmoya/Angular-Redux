import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ChartType } from "chart.js";
import { Label, MultiDataSet } from "ng2-charts";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "../../models/ingreso-egreso.model";
import { AppStateWithIngresoEgresoModule } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  doughnutChartLabels: Label[] = ["Ingreso", "Egreso"];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = "doughnut";

  constructor(private store: Store<AppStateWithIngresoEgresoModule>) {}

  ngOnInit() {
    this.store.select("ingresosEgresos").subscribe(({ items }) => {
      console.log(items);
      this.generateEstadistica(items);
    });
  }

  generateEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.totalIngresos = 0;
    this.totalEgresos = 0;

    items.forEach((item) => {
      if (item.tipo === "ingreso") {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
