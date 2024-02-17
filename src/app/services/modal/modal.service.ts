import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isShowDepartmentModal: Subject<boolean> = new BehaviorSubject(false);
  isShowEmployeeModal: Subject<boolean> = new BehaviorSubject(false);
  isShowProjectModal: Subject<boolean> = new BehaviorSubject(false);
  isShowAssignmentModal: Subject<boolean> = new BehaviorSubject(false);
  constructor() {}

  onShowDepartmentModal(value: boolean) {
    this.isShowDepartmentModal.next(value);
  }

  onShowEmployeeModal(value: boolean) {
    this.isShowEmployeeModal.next(value);
  }

  onShowProjectModal(value: boolean) {
    this.isShowProjectModal.next(value);
  }

  onShowAssignmentModal(value: boolean) {
    this.isShowAssignmentModal.next(value);
  }
}
