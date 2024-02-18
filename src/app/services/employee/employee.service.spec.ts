import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Employee } from '../../models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpClient: HttpTestingController;

  const mockEmployee: Employee = {
    id: 1,
    dateOfBirth: '2024-11-28',
    firstName: 'LAM',
    lastName: 'PHAT',
    middleName: 'THINH',
    gender: 'MALE',
    salary: 123456,
    projects: [],
  };

  const employee: Employee = {
    dateOfBirth: '2024-11-28',
    firstName: 'LAM',
    lastName: 'PHAT',
    middleName: 'THINH',
    gender: 'MALE',
    salary: 123456,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api create employee', () => {
    service.createEmployee(employee, 1).subscribe((res) => {
      expect(res).toEqual(mockEmployee);
    });

    const req = httpClient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/employees'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockEmployee);
  });

  it('should get list employee', () => {
    service.getEmployees().subscribe((res) => {
      expect(res).toEqual([mockEmployee]);
    });

    const req = httpClient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/employees'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([mockEmployee]);
  });
});
