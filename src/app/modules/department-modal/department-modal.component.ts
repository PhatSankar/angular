import { ModalService } from '../../services/modal/modal.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { error } from 'console';

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrl: './department-modal.component.css',
})
export class DepartmentModalComponent {
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl(''),
    startDate: new FormControl(''),
  });

  constructor(
    private departmentService: DepartmentService,
    private modalSerive: ModalService
  ) {}

  onSubmit(): void {
    this.departmentService
      .addDepartment(
        this.departmentForm.controls['departmentName'].value,
        this.departmentForm.controls['startDate'].value
      )
      .subscribe(
        (res) => {
          this.departmentService.refreshDepartList();
          this.modalSerive.onShowDepartmentModal(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
