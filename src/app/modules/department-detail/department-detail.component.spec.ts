import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDetailComponent } from './department-detail.component';
import { DepartmentService } from '../../services/department/department.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Department } from '../../models/department.model';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('DepartmentDetailComponent', () => {
  let component: DepartmentDetailComponent;
  let fixture: ComponentFixture<DepartmentDetailComponent>;
  let departmentService: jasmine.SpyObj<DepartmentService>;
  let htppCLient: HttpTestingController;

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

  beforeEach(async () => {
    departmentService = jasmine.createSpyObj('DepartmentService', [
      'getDepartmentById$',
    ]);
    await TestBed.configureTestingModule({
      declarations: [DepartmentDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        {
          provide: DepartmentService,
          useValue: departmentService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentDetailComponent);
    htppCLient = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get Department by id', () => {
    departmentService.getDepartmentById$
      .withArgs('1')
      .and.returnValue(of(mockDepartmentSingle));

    expect(departmentService.getDepartmentById$).toHaveBeenCalledOnceWith('1');
  });
});
