import { TestBed } from '@angular/core/testing';

import { DepartmentService } from './department.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Department } from '../../models/department.model';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpClient: HttpTestingController;

  const mockDepartmentSingle: Department = {
    id: 1,
    createdAt: '20-04-2022',
    updatedAt: '20-04-2022',
    startDate: '20-04-2022',
    departmentName: 'AA',
    employees: [
      {
        id: 1,
        dateOfBirth: '20-04-2022',
        firstName: 'lam',
        middleName: 'thinh',
        lastName: 'phat',
        gender: 'MALE',
        salary: 105000,
        projects: [],
      },
    ],
  };

  const mockDepartmentCreate: Department = {
    id: 1,
    createdAt: '20-04-2022',
    updatedAt: '20-04-2022',
    startDate: '20-04-2022',
    departmentName: 'AA',
    employees: [],
  };

  const mockDepartments: Department[] = [mockDepartmentSingle];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [DepartmentService],
    });
    service = TestBed.inject(DepartmentService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Departments', () => {
    service.getDepartment$().subscribe((res) => {
      expect(res).toEqual(mockDepartments);
    });

    const req = httpClient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/departments'
    );
    req.flush(mockDepartments);
  });

  it('should get Departments by id', () => {
    const validId: string = '1';
    service.getDepartmentById$(validId).subscribe((res) => {
      expect(res).toEqual(mockDepartmentSingle);
    });

    const req = httpClient.expectOne(
      `http://localhost:8080/jakartaee-hello-world/departments/${validId}`
    );
    req.flush(mockDepartmentSingle);
  });

  it('should add Departments', () => {
    service.addDepartment('AA', '20-04-2022').subscribe((res) => {
      expect(res).toEqual(mockDepartmentCreate);
    });

    const req = httpClient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/departments'
    );
    req.flush(mockDepartmentCreate);
  });

  it('should refeshList', () => {
    const spyNext = spyOn(service.refeshList, 'next');
    service.refreshDepartList();
    expect(spyNext).toHaveBeenCalled();
  });
});
