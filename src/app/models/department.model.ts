import { Employee } from "./employee.model";

export interface Department {
    id: number,
    createdAt: string,
    updatedAt:string,
    startDate: string,
    departmentName: string,
    employess: Employee[]
}