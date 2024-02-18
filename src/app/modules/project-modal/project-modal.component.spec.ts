import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalComponent } from './project-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { ProjectService } from '../../services/project/project.service';
import { ModalService } from '../../services/modal/modal.service';
import { Department } from '../../models/department.model';
import { of, throwError } from 'rxjs';
import { Project } from '../../models/project.model';

describe('ProjectModalComponent', () => {
  let component: ProjectModalComponent;
  let fixture: ComponentFixture<ProjectModalComponent>;
  let departmentService: jasmine.SpyObj<DepartmentService>;
  let projectService: jasmine.SpyObj<ProjectService>;
  let modalService: jasmine.SpyObj<ModalService>;

  const mockProject: Project = {
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
  };

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

  beforeEach(async () => {
    departmentService = jasmine.createSpyObj('DepartmentService', [
      'getDepartment$',
    ]);

    projectService = jasmine.createSpyObj('ProjectService', ['createProject']);

    modalService = jasmine.createSpyObj('ModalService', ['onShowProjectModal']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProjectModalComponent],
      providers: [
        {
          provide: DepartmentService,
          useValue: departmentService,
        },

        {
          provide: ProjectService,
          useValue: projectService,
        },
        {
          provide: ModalService,
          useValue: modalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch departments list not empty', () => {
    departmentService.getDepartment$.and.returnValue(of(mockDepartments));
    component.ngOnInit();

    departmentService.getDepartment$().subscribe((res) => {
      expect(component.projectForm.controls['depId'].value).toBe(res.at(0)?.id);
    });
  });

  it('should create project successfully', () => {
    component.projectForm.setValue({
      projectName: 'RN',
      area: 'HCM',
      depId: 1,
    });
    projectService.createProject
      .withArgs(
        component.projectForm.controls['projectName'].value,
        component.projectForm.controls['area'].value,
        component.projectForm.controls['depId'].value
      )
      .and.returnValue(of(mockProject));

    modalService.onShowProjectModal.and.returnValue();

    component.onSubmit();

    projectService
      .createProject(
        component.projectForm.controls['projectName'].value,
        component.projectForm.controls['area'].value,
        component.projectForm.controls['depId'].value
      )
      .subscribe((res) => {
        expect(modalService.onShowProjectModal).toHaveBeenCalledOnceWith(false);
      });
  });

  it('should create project failed', () => {
    component.projectForm.setValue({
      projectName: 'RN',
      area: 'HCM',
      depId: 1,
    });
    projectService.createProject
      .withArgs(
        component.projectForm.controls['projectName'].value,
        component.projectForm.controls['area'].value,
        component.projectForm.controls['depId'].value
      )
      .and.returnValue(throwError('Fail to create project'));

    const spyConsoleLog = spyOn(console, 'log');
    component.onSubmit();

    projectService
      .createProject(
        component.projectForm.controls['projectName'].value,
        component.projectForm.controls['area'].value,
        component.projectForm.controls['depId'].value
      )
      .subscribe(
        (_) => {},
        (err) => {
          expect(spyConsoleLog).toHaveBeenCalledOnceWith(err);
        }
      );
  });
});
