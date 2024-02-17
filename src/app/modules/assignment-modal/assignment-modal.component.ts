import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable, startWith, switchMap } from 'rxjs';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department/department.service';
import { ModalService } from '../../services/modal/modal.service';
import { ProjectService } from '../../services/project/project.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { Project } from '../../models/project.model';
import { Employee } from '../../models/employee.model';
import { AssignmentService } from '../../services/assignment/assignment.service';

@Component({
  selector: 'app-assignment-modal',
  templateUrl: './assignment-modal.component.html',
  styleUrl: './assignment-modal.component.css',
})
export class AssignmentModalComponent {
  assignmentForm: FormGroup = new FormGroup({
    numberOfHour: new FormControl(0),
    employeeId: new FormControl(null),
    projectId: new FormControl(null),
  });
  readonly #projectRefetch$ = new Subject<void>();
  projects$: Observable<Project[]> = this.#projectRefetch$.pipe(
    startWith(true),
    switchMap(() => this.projectService.getProjects())
  );

  readonly #employeeRefetch$ = new Subject<void>();
  employees$: Observable<Employee[]> = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() => this.employeeService.getEmployees())
  );

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private assignmentService: AssignmentService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.projects$.subscribe((projects) => {
      if (projects.length > 0) {
        this.assignmentForm.patchValue({
          projectId: projects[0].id,
        });
      }
    });

    this.employees$.subscribe((employees) => {
      if (employees.length > 0) {
        this.assignmentForm.patchValue({
          employeeId: employees[0].id,
        });
      }
    });
  }

  onSubmit(): void {
    this.assignmentService
      .createAssignment(
        this.assignmentForm.controls['numberOfHour'].value,
        this.assignmentForm.controls['employeeId'].value,
        this.assignmentForm.controls['projectId'].value
      )
      .subscribe(
        (_) => {
          this.modalService.onShowAssignmentModal(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
