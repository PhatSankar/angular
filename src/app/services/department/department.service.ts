import { Department } from './../../models/department.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  refeshList: Subject<void> = new Subject<void>();
  constructor(private httpClient: HttpClient) {}

  addDepartment(
    departmentName: string,
    startDate: string
  ): Observable<Department> {
    return this.httpClient.post<Department>(
      'http://localhost:8080/jakartaee-hello-world/departments',
      {
        departmentName,
        startDate,
      }
    );
  }

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

  refreshDepartList() {
    this.refeshList.next();
  }
}
