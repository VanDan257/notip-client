import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginAdminComponent} from "./pages/login-admin/login-admin.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "dang-nhap-admin",
    component: LoginAdminComponent
  },
  {
    path: "",
    component: HomeComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
