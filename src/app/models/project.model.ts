import { Department } from './department.model';

export interface Project {
  id: number;
  createdAt: string;
  updatedAt: string;

  area: string;
  projectName: string;
  managedDepartment: Department;
}
