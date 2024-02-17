import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'employeeProject';
  isShowDepartmentModal: boolean = false;
  isShowEmployeeModal: boolean = false;
  isShowProjectModal: boolean = false;
  isShowAssignmentModal: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.isShowDepartmentModal.subscribe((value) => {
      this.isShowDepartmentModal = value;
    });

    this.modalService.isShowEmployeeModal.subscribe((value) => {
      this.isShowEmployeeModal = value;
    });

    this.modalService.isShowProjectModal.subscribe((value) => {
      this.isShowProjectModal = value;
    });

    this.modalService.isShowAssignmentModal.subscribe((value) => {
      this.isShowAssignmentModal = value;
    });
  }

  onClickBackground() {
    this.isShowDepartmentModal = false;
    this.isShowEmployeeModal = false;
    this.isShowProjectModal = false;
    this.isShowAssignmentModal = false;
  }
}
