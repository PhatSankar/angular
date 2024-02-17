import { Project } from './project.model';

export interface Employee {
  id?: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  salary: number;
  projects?: Project[];
}
