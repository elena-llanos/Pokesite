import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "admin", canActivate: [AuthGuard], component: AdminComponent },
  { path: "login", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "list-table", component: ListTableComponent },
  { path: "detail/:id", component: DetailComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", component: ErrorComponent } //ÉSTE SIEMPRE EL ÚLTIMO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
