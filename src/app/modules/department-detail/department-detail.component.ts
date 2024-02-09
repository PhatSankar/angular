import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.css',
})
export class DepartmentDetailComponent {
  departId: string | null = this.activeRoute.snapshot.paramMap.get('id');

  #departmentRefetch$ = new Subject<void>();

  department$: Observable<Department> = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.getDepartmentById$(this.departId!))
  );

  constructor(
    private activeRoute: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}
}
