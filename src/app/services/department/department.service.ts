import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}

  getDepartment$(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(
      'http://localhost:8080/jakartaee-hello-world/departments'
    );
  }

  getDepartmentById$(id: string): Observable<Department> {
    return this.httpClient.get<Department>(
      `http://localhost:8080/jakartaee-hello-world/departments/${id}`
    );
  }
}
