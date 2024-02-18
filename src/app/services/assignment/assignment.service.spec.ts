import { TestBed } from '@angular/core/testing';

import { AssignmentService } from './assignment.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Assignment } from '../../models/assignment.model';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let httpClient: HttpTestingController;

  const mockAssignment: Assignment = {
    id: 1,
    createdAt: '2024-11-28',
    updatedAt: '2024-11-28',
    employee: {
      id: 1,
      dateOfBirth: '2024-11-28',
      firstName: 'LAM',
      lastName: 'PHAT',
      middleName: 'THINH',
      gender: 'MALE',
      salary: 123456,
      projects: [],
    },
    project: {
      id: 2,
      projectName: 'FLUTTER',
      createdAt: '2024-11-28',
      updatedAt: '2024-11-28',
      area: 'HCM',
      managedDepartment: {
        id: 1,
        createdAt: '2024-11-28',
        updatedAt: '2024-11-28',
        startDate: '2024-11-28',
        departmentName: 'ACB',
        employees: [],
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssignmentService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post createAssignment', () => {
    service.createAssignment(10, 1, 2).subscribe((res) => {
      expect(res).toEqual(mockAssignment);
    });

    const req = httpClient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/assignments'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockAssignment);
  });

  afterAll(() => {
    httpClient.verify();
  });
});
