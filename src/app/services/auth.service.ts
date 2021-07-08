import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import * as authActions from "../auth/auth.actions";
import { Subscription } from "rxjs";
import * as ingresoEgresoAction from "../ingreso-egreso/ingreso-egreso.action";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSubscription: Subscription;
  private _user: User;
  get user() {
    return { ...this._user };
  }

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fireUser) => {
      if (fireUser) {
        this.userSubscription = this.firestore
          .doc(`${fireUser.uid}/usuario`)
          .valueChanges()
          .subscribe((userData: any) => {
            const user: User = User.fromFirebase(userData);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoAction.unSetItems());
      }
    });
  }

  crearUsuario(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fireUser) => {
        const user = new User(fireUser.user.uid, name, password);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...user });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUsuario() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fireUser) => fireUser != null)); //si existe true si no falswe;
  }
}
