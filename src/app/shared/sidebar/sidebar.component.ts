import { Component, OnDestroy, OnInit, Pipe } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription, pipe } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string = "";
  authSubcription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSubcription = this.store
      .select("auth")
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => {
        this.name = user.name;
      });
  }

  ngOnDestroy() {
    this.authSubcription?.unsubscribe();
  }

  logout() {
    this.authService.logoutUsuario().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
