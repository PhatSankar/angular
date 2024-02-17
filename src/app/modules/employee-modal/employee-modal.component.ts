import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department/department.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee.model';
import { error } from 'console';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css',
})
export class EmployeeModalComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
    dateOfBirth: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    salary: new FormControl(0),
    gender: new FormControl('MALE'),
    depId: new FormControl(null),
  });

  readonly #departmentRefetch$ = new Subject<void>();
  departments$: Observable<Department[]> = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.getDepartment$())
  );

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.departments$.subscribe((departments) => {
      if (departments.length > 0) {
        this.employeeForm.patchValue({
          depId: departments[0].id,
        });
      }
    });
  }

  onSubmit(): void {
    const employee: Employee = {
      dateOfBirth: this.employeeForm.controls['dateOfBirth'].value,
      firstName: this.employeeForm.controls['firstName'].value,
      middleName: this.employeeForm.controls['middleName'].value,
      lastName: this.employeeForm.controls['lastName'].value,
      salary: this.employeeForm.controls['salary'].value,
      gender: this.employeeForm.controls['gender'].value,
    };
    this.employeeService
      .createEmployee(employee, this.employeeForm.controls['depId'].value)
      .subscribe(
        (_) => {
          this.modalService.onShowEmployeeModal(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
