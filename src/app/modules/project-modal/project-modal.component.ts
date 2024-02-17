import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Department } from '../../models/department.model';
import { ProjectService } from '../../services/project/project.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css',
})
export class ProjectModalComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    area: new FormControl(''),
    depId: new FormControl(null),
  });

  areas: string[] = ['HCM', 'HN'];

  readonly #departmentRefetch$ = new Subject<void>();
  departments$: Observable<Department[]> = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.getDepartment$())
  );

  constructor(
    private departmentService: DepartmentService,
    private projectService: ProjectService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.projectForm.patchValue({
      area: this.areas.at(0),
    });
    this.departments$.subscribe((departments) => {
      if (departments.length > 0) {
        this.projectForm.patchValue({
          depId: departments[0].id,
        });
      }
    });
  }

  onSubmit(): void {
    this.projectService
      .createProject(
        this.projectForm.controls['projectName'].value,
        this.projectForm.controls['area'].value,
        this.projectForm.controls['depId'].value
      )
      .subscribe(
        (_) => {
          this.modalService.onShowProjectModal(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
