import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../../models/assignment.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private httpCLient: HttpClient) {}

  createAssignment(
    numberOfHour: number,
    employeeId: number,
    projectId: number
  ): Observable<Assignment> {
    return this.httpCLient.post<Assignment>(
      'http://localhost:8080/jakartaee-hello-world/assignments',
      {
        numberOfHour,
        employeeId,
        projectId,
      }
    );
  }
}
