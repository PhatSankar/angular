import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DepartmentTableComponent } from './department-table.component';
import { DepartmentService } from '../../services/department/department.service';
import { Department } from '../../models/department.model';
import { Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepartmentTableComponent', () => {
  let component: DepartmentTableComponent;
  let fixture: ComponentFixture<DepartmentTableComponent>;
  let departmentService: jasmine.SpyObj<DepartmentService>;

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

  let router: Router;

  beforeEach(async () => {
    departmentService = jasmine.createSpyObj(
      'DepartmentService',
      ['getDepartment$', 'refreshDepartList'],
      { refeshList: new Subject<void>() }
    );
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DepartmentTableComponent],
      providers: [
        Router,
        {
          provide: DepartmentService,
          useValue: departmentService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentTableComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get department list', () => {
    departmentService.getDepartment$.and.returnValue(of(mockDepartments));
    expect(departmentService.getDepartment$).toHaveBeenCalled();
  });

  it('On click to navigate', fakeAsync(() => {
    const routerSpy = spyOn(router, 'navigate');
    component.onClickRow(1);

    expect(routerSpy).toHaveBeenCalledOnceWith(['departments', 1]);
  }));

  it('should refetch list', () => {
    const spy = spyOn(component.departmentRefetch$, 'next');
    departmentService.refeshList.next();
    departmentService.refeshList.subscribe((_) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
