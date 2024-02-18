import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentModalComponent } from './department-modal.component';
import { DepartmentService } from '../../services/department/department.service';
import { ModalService } from '../../services/modal/modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Department } from '../../models/department.model';

describe('DepartmentModalComponent', () => {
  let component: DepartmentModalComponent;
  let fixture: ComponentFixture<DepartmentModalComponent>;
  let mockDepartmentService: jasmine.SpyObj<DepartmentService>;
  let mockModalService: jasmine.SpyObj<ModalService>;

  const mockDepartment: Department = {
    id: 1,
    createdAt: '2024-11-28',
    updatedAt: '2024-11-28',
    startDate: '2024-11-28',
    departmentName: 'ACB',
    employees: [],
  };

  beforeEach(async () => {
    mockDepartmentService = jasmine.createSpyObj('DepartmentService', [
      'refreshDepartList',
      'addDepartment',
    ]);

    mockModalService = jasmine.createSpyObj('ModalService', [
      'onShowDepartmentModal',
    ]);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DepartmentModalComponent],
      providers: [
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create department successfully', () => {
    component.departmentForm.setValue({
      departmentName: 'VAMOS',
      startDate: '2024-11-20',
    });
    mockDepartmentService.addDepartment
      .withArgs(
        component.departmentForm.controls['departmentName'].value,
        component.departmentForm.controls['startDate'].value
      )
      .and.returnValue(of(mockDepartment));

    component.onSubmit();

    mockDepartmentService
      .addDepartment(
        component.departmentForm.controls['departmentName'].value,
        component.departmentForm.controls['startDate'].value
      )
      .subscribe((_) => {
        expect(mockDepartmentService.refreshDepartList).toHaveBeenCalled();
        expect(mockModalService.onShowDepartmentModal).toHaveBeenCalledOnceWith(
          false
        );
      });
  });

  it('should create department failed', () => {
    component.departmentForm.setValue({
      departmentName: 'VAMOS',
      startDate: '2024-11-20',
    });

    mockDepartmentService.addDepartment
      .withArgs(
        component.departmentForm.controls['departmentName'].value,
        component.departmentForm.controls['startDate'].value
      )
      .and.returnValue(throwError('Fail to create department'));

    const spyConsoleLog = spyOn(console, 'log');

    component.onSubmit();

    mockDepartmentService
      .addDepartment(
        component.departmentForm.controls['departmentName'].value,
        component.departmentForm.controls['startDate'].value
      )
      .subscribe(
        (_) => {},
        (error) => {
          expect(spyConsoleLog).toHaveBeenCalledOnceWith(
            'Fail to create department'
          );
          expect(error).toBe('Fail to create department');
        }
      );
  });
});
