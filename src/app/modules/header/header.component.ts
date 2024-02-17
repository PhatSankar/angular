import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isShownDepartmentDropdown: boolean = false;
  isShownEmployeeDropdown: boolean = false;
  isShownProjectDropdown: boolean = false;
  isShownSignmentDropdown: boolean = false;

  constructor(private modalService: ModalService) {}

  onHoverDepartment(value: boolean): void {
    this.isShownDepartmentDropdown = value;
  }

  onHoverEmployee(value: boolean): void {
    this.isShownEmployeeDropdown = value;
  }

  onHoverProject(value: boolean): void {
    this.isShownProjectDropdown = value;
  }

  onHoverAssignment(value: boolean): void {
    this.isShownSignmentDropdown = value;
  }

  onShowDepartmentModal(value: boolean) {
    this.modalService.onShowDepartmentModal(value);
  }

  onShowEmployeeModal(value: boolean) {
    this.modalService.onShowEmployeeModal(value);
  }

  onShowProjectModal(value: boolean) {
    this.modalService.onShowProjectModal(value);
  }

  onShowAssignmentModal(value: boolean) {
    this.modalService.onShowAssignmentModal(value);
  }
}
