import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//-------Componentes
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
