import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import * as ingresoEgresoAction from "../ingreso-egreso/ingreso-egreso.action";
import { IngresoEgreso } from "../models/ingreso-egreso.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.userSubs = this.store
      .select("auth")
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.ingresosSubs = this.ingresoEgresoService
          .initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFb) => {
            //const ingresosEgresos = ingresosEgresosFb.map(item => new IngresoEgreso(...item))
            this.store.dispatch(
              ingresoEgresoAction.setItems({ items: ingresosEgresosFb })
            );
          });
      });
  }

  ngOnDestroy() {
    this.ingresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
