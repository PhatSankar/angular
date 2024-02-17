import { Employee } from './../../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpCLient: HttpClient) {}

  createEmployee(employee: Employee, depId: number) {
    return this.httpCLient.post(
      'http://localhost:8080/jakartaee-hello-world/employees',
      { ...employee, depId }
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpCLient.get<Employee[]>(
      'http://localhost:8080/jakartaee-hello-world/employees'
    );
  }
}
