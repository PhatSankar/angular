import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private httpCLient: HttpClient) {}

  createAssignment(
    numberOfHour: number,
    employeeId: number,
    projectId: number
  ) {
    return this.httpCLient.post(
      'http://localhost:8080/jakartaee-hello-world/assignments',
      {
        numberOfHour,
        employeeId,
        projectId,
      }
    );
  }
}
