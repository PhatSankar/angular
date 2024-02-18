import { Employee } from './employee.model';
import { Project } from './project.model';

export interface Assignment {
  id: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  project: Project;
}
