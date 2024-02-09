import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, startWith, switchMap } from 'rxjs';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department/department.service';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrl: './department-table.component.css',
})
export class DepartmentTableComponent {
  readonly #departmentRefetch$ = new Subject<void>();
  departments$: Observable<Department[]> = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.deparmentSerive.getDepartment$())
  );

  constructor(
    private deparmentSerive: DepartmentService,
    private router: Router
  ) {}

  onClickRow(departId: number) {
    this.router.navigate(['departments', departId]);
  }
}
