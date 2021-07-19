import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { DetalleComponent } from "./detalle/detalle.component";

import { OrdenIngresoPipe } from "../pipes/orden-ingreso.pipe";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ChartsModule } from "ng2-charts";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutesModule } from "../dashboard/dashboard-routes.module";
import { StoreModule } from "@ngrx/store";

import { ingresoEgresoReducer } from "./ingreso-egreso.reducer";

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("ingresosEgresos", ingresoEgresoReducer),
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class IngresoEgresoModule {}
