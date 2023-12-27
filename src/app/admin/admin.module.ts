import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    AdminComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginAdminComponent,
    HomeComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
