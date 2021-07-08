import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IngresoEgresoService {
  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) {}

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.fireStore
      .doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.fireStore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      );
  }

  borrarIngresoEgreso(id: string) {
    return this.fireStore
      .doc(`${this.authService.user.uid}/ingresos-egresos/items/${id}`)
      .delete();
  }
}
