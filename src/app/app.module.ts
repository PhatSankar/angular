import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentDetailComponent } from './modules/department-detail/department-detail.component';
import { DepartmentTableComponent } from './modules/department-table/department-table.component';
import { DepartmentModalComponent } from './modules/department-modal/department-modal.component';
import { EmployeeModalComponent } from './modules/employee-modal/employee-modal.component';
import { ProjectModalComponent } from './modules/project-modal/project-modal.component';
import { AssignmentModalComponent } from './modules/assignment-modal/assignment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    DepartmentDetailComponent,
    DepartmentTableComponent,
    DepartmentModalComponent,
    EmployeeModalComponent,
    ProjectModalComponent,
    AssignmentModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
