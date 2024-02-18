import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Project } from '../../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpCLient: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectService);
    httpCLient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api create project', () => {
    service.createProject('FLUTTER', 'HCM', 1).subscribe((res) => {
      expect(res).toEqual(mockProject);
    });

    const req = httpCLient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/projects'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockProject);
  });

  it('should get list employee', () => {
    service.getProjects().subscribe((res) => {
      expect(res).toEqual([mockProject]);
    });

    const req = httpCLient.expectOne(
      'http://localhost:8080/jakartaee-hello-world/projects'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([mockProject]);
  });
});
