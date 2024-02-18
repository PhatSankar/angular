import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit value to isShowDepartmentModal', () => {
    service.onShowDepartmentModal(true);
    service.isShowDepartmentModal.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should emit value to isShowEmployeeModal', () => {
    service.onShowEmployeeModal(true);
    service.isShowEmployeeModal.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should emit value to isShowProjectModal', () => {
    service.onShowProjectModal(true);
    service.isShowProjectModal.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should emit value to isShowAssignmentModal', () => {
    service.onShowAssignmentModal(true);
    service.isShowAssignmentModal.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });
});
