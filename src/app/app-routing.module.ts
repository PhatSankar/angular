import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { DepartmentDetailComponent } from './modules/department-detail/department-detail.component';
import { DepartmentTableComponent } from './modules/department-table/department-table.component';

const routes: Routes = [
  // {
  //   path: "", redirectTo: "/login", pathMatch:"full"
  // },
  {
    path: '',
    component: DepartmentTableComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'departments/:id',
    component: DepartmentDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
