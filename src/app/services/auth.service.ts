import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fireUser) => {
      console.log(fireUser);
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
