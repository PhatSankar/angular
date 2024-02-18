import { Employee } from './../../models/employee.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentModalComponent } from './assignment-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { of, throwError } from 'rxjs';
import { Project } from '../../models/project.model';
import { EmployeeService } from '../../services/employee/employee.service';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { ModalService } from '../../services/modal/modal.service';
import { Assignment } from '../../models/assignment.model';

describe('AssignmentModalComponent', () => {
  let component: AssignmentModalComponent;
  let fixture: ComponentFixture<AssignmentModalComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockAssignmentService: jasmine.SpyObj<AssignmentService>;
  let mockModalService: jasmine.SpyObj<ModalService>;

  const mockListProjects: Project[] = [
    {
      id: 1,
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
  ];

  const mockEmployees: Employee[] = [
    {
      id: 1,
      dateOfBirth: '2024-11-28',
      firstName: 'LAM',
      lastName: 'PHAT',
      middleName: 'THINH',
      gender: 'MALE',
      salary: 123456,
      projects: [],
    },
  ];

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
      id: 1,
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

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
    ]);
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'getProjects',
    ]);
    mockAssignmentService = jasmine.createSpyObj('AssignmentService', [
      'createAssignment',
    ]);
    mockModalService = jasmine.createSpyObj('ModalService', [
      'onShowAssignmentModal',
    ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AssignmentModalComponent],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
        {
          provide: ProjectService,
          useValue: mockProjectService,
        },
        {
          provide: AssignmentService,
          useValue: mockAssignmentService,
        },
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should skip if fetch empty list', () => {
    mockProjectService.getProjects.and.returnValue(of([]));
    mockEmployeeService.getEmployees.and.returnValue(of([]));

    mockEmployeeService.getEmployees().subscribe((res) => {
      expect(component.assignmentForm.controls['employeeId'].value).toBeNull();
    });

    mockProjectService.getProjects().subscribe((res) => {
      expect(component.assignmentForm.controls['projectId'].value).toBeNull();
    });
  });

  it('should set project id to first index of list if fetch projects successfully', () => {
    mockProjectService.getProjects.and.returnValue(of(mockListProjects));
    mockEmployeeService.getEmployees.and.returnValue(of(mockEmployees));

    component.ngOnInit();

    mockEmployeeService.getEmployees().subscribe((res) => {
      expect(component.assignmentForm.controls['employeeId'].value).toBe(
        mockEmployees.at(0)?.id
      );
    });
    mockProjectService.getProjects().subscribe((res) => {
      expect(component.assignmentForm.controls['projectId'].value).toBe(
        mockListProjects.at(0)?.id
      );
    });
  });

  it('should set project id to first index of list if fetch projects successfully', () => {
    mockProjectService.getProjects.and.returnValue(of(mockListProjects));
    mockEmployeeService.getEmployees.and.returnValue(of(mockEmployees));

    component.ngOnInit();

    mockEmployeeService.getEmployees().subscribe((res) => {
      expect(component.assignmentForm.controls['employeeId'].value).toBe(
        mockEmployees.at(0)?.id
      );
    });
    mockProjectService.getProjects().subscribe((res) => {
      expect(component.assignmentForm.controls['projectId'].value).toBe(
        mockListProjects.at(0)?.id
      );
    });
  });

  it('should create assignment successfully', () => {
    component.assignmentForm.setValue({
      numberOfHour: 10,
      employeeId: 1,
      projectId: 1,
    });
    mockAssignmentService.createAssignment
      .withArgs(
        component.assignmentForm.controls['numberOfHour'].value,
        component.assignmentForm.controls['employeeId'].value,
        component.assignmentForm.controls['projectId'].value
      )
      .and.returnValue(of(mockAssignment));

    component.onSubmit();

    expect(mockModalService.onShowAssignmentModal).toHaveBeenCalledOnceWith(
      false
    );
  });

  it('should create assignment failed', () => {
    const errorMessage = 'Error occurred while creating assignment';
    mockAssignmentService.createAssignment.and.returnValue(
      throwError(errorMessage)
    );
    const spyConsoleLog = spyOn(console, 'log');

    component.assignmentForm.setValue({
      numberOfHour: 10,
      employeeId: 1,
      projectId: 1,
    });

    component.onSubmit();

    expect(spyConsoleLog).toHaveBeenCalledWith(errorMessage);
  });
});
