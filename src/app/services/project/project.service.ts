import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  createProject(
    projectName: string,
    area: string,
    depId: number
  ): Observable<Project> {
    return this.httpClient.post<Project>(
      'http://localhost:8080/jakartaee-hello-world/projects',
      {
        projectName,
        area,
        depId,
      }
    );
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      'http://localhost:8080/jakartaee-hello-world/projects'
    );
  }
}
