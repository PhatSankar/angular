import { ModalService } from './../../services/modal/modal.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalComponent } from './employee-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { Department } from '../../models/department.model';
import { of, throwError } from 'rxjs';
import { Employee } from '../../models/employee.model';

describe('EmployeeModalComponent', () => {
  let component: EmployeeModalComponent;
  let fixture: ComponentFixture<EmployeeModalComponent>;
  let departmentService: jasmine.SpyObj<DepartmentService>;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let modalService: jasmine.SpyObj<ModalService>;

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

  const mockDepartments: Department[] = [mockDepartmentSingle];

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

  beforeEach(async () => {
    departmentService = jasmine.createSpyObj('DepartmentService', [
      'getDepartment$',
    ]);
    employeeService = jasmine.createSpyObj('EmployeeService', [
      'createEmployee',
    ]);
    modalService = jasmine.createSpyObj('ModalService', [
      'onShowEmployeeModal',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EmployeeModalComponent],
      providers: [
        {
          provide: DepartmentService,
          useValue: departmentService,
        },
        {
          provide: EmployeeService,
          useValue: employeeService,
        },

        {
          provide: ModalService,
          useValue: modalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set employee if list not empty', () => {
    departmentService.getDepartment$.and.returnValue(of(mockDepartments));
    component.ngOnInit();

    departmentService.getDepartment$().subscribe((res) => {
      expect(component.employeeForm.controls['depId'].value).toBe(
        res.at(0)?.id
      );
    });
  });

  it('should submit employee to create employee', () => {
    component.employeeForm.setValue({
      dateOfBirth: '2024-11-28',
      firstName: 'LAM',
      lastName: 'PHAT',
      middleName: 'THINH',
      gender: 'MALE',
      salary: 123456,
      depId: 1,
    });

    const employee: Employee = {
      dateOfBirth: component.employeeForm.controls['dateOfBirth'].value,
      firstName: component.employeeForm.controls['firstName'].value,
      middleName: component.employeeForm.controls['middleName'].value,
      lastName: component.employeeForm.controls['lastName'].value,
      salary: component.employeeForm.controls['salary'].value,
      gender: component.employeeForm.controls['gender'].value,
    };

    employeeService.createEmployee
      .withArgs(employee, component.employeeForm.controls['depId'].value)
      .and.returnValue(of(mockEmployee));
    modalService.onShowEmployeeModal.and.returnValue();

    component.onSubmit();

    employeeService
      .createEmployee(employee, component.employeeForm.controls['depId'].value)
      .subscribe((_) => {
        expect(modalService.onShowEmployeeModal).toHaveBeenCalledWith(false);
      });
  });
  it('should submit employee to log error', () => {
    component.employeeForm.setValue({
      dateOfBirth: '2024-11-28',
      firstName: 'LAM',
      lastName: 'PHAT',
      middleName: 'THINH',
      gender: 'MALE',
      salary: 123456,
      depId: 1,
    });

    const employee: Employee = {
      dateOfBirth: component.employeeForm.controls['dateOfBirth'].value,
      firstName: component.employeeForm.controls['firstName'].value,
      middleName: component.employeeForm.controls['middleName'].value,
      lastName: component.employeeForm.controls['lastName'].value,
      salary: component.employeeForm.controls['salary'].value,
      gender: component.employeeForm.controls['gender'].value,
    };

    employeeService.createEmployee
      .withArgs(employee, component.employeeForm.controls['depId'].value)
      .and.returnValue(throwError('Fail to create employee'));
    const spyConsoleLog = spyOn(console, 'log');
    component.onSubmit();

    employeeService
      .createEmployee(employee, component.employeeForm.controls['depId'].value)
      .subscribe(
        (_) => {},
        (error) => {
          expect(spyConsoleLog).toHaveBeenCalledOnceWith(
            'Fail to create employee'
          );
        }
      );
  });
});
