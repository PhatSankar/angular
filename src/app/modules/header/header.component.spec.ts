import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ModalService } from '../../services/modal/modal.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('ModalService', [
      'onShowDepartmentModal',
      'onShowEmployeeModal',
      'onShowProjectModal',
      'onShowAssignmentModal',
    ]);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: ModalService,
          useValue: modalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isShowDepartment true', () => {
    component.onHoverDepartment(true);
    expect(component.isShownDepartmentDropdown).toBeTrue();
  });

  it('should set isShownProjectDropdown  true', () => {
    component.onHoverProject(true);
    expect(component.isShownProjectDropdown).toBeTrue();
  });

  it('should set isShownEmployeeDropdown true', () => {
    component.onHoverEmployee(true);
    expect(component.isShownEmployeeDropdown).toBeTrue();
  });

  it('should set isShownSignmentDropdown true', () => {
    component.onHoverAssignment(true);
    expect(component.isShownSignmentDropdown).toBeTrue();
  });

  //

  it('should set isShowDepartment false', () => {
    component.onHoverDepartment(false);
    expect(component.isShownDepartmentDropdown).toBeFalse();
  });

  it('should set isShownProjectDropdown false', () => {
    component.onHoverProject(false);
    expect(component.isShownProjectDropdown).toBeFalse();
  });

  it('should set isShownEmployeeDropdown false', () => {
    component.onHoverEmployee(false);
    expect(component.isShownEmployeeDropdown).toBeFalse();
  });

  it('should set isShownSignmentDropdown false', () => {
    component.onHoverAssignment(false);
    expect(component.isShownSignmentDropdown).toBeFalse();
  });

  //

  it('should call modalService onShowDepartmentModal false', () => {
    component.onShowDepartmentModal(false);
    expect(modalService.onShowDepartmentModal).toHaveBeenCalledOnceWith(false);
  });

  it('should call modalService onShowEmployeeModal false', () => {
    component.onShowEmployeeModal(false);
    expect(modalService.onShowEmployeeModal).toHaveBeenCalledOnceWith(false);
  });

  it('should call modalService onShowProjectModal false', () => {
    component.onShowProjectModal(false);
    expect(modalService.onShowProjectModal).toHaveBeenCalledOnceWith(false);
  });

  it('should call modalService onShowAssignmentModal false', () => {
    component.onShowAssignmentModal(false);
    expect(modalService.onShowAssignmentModal).toHaveBeenCalledOnceWith(false);
  });

  //

  it('should call modalService onShowDepartmentModal true', () => {
    component.onShowDepartmentModal(true);
    expect(modalService.onShowDepartmentModal).toHaveBeenCalledOnceWith(true);
  });

  it('should call modalService onShowEmployeeModal true', () => {
    component.onShowEmployeeModal(true);
    expect(modalService.onShowEmployeeModal).toHaveBeenCalledOnceWith(true);
  });

  it('should call modalService onShowProjectModal true', () => {
    component.onShowProjectModal(true);
    expect(modalService.onShowProjectModal).toHaveBeenCalledOnceWith(true);
  });

  it('should call modalService onShowAssignmentModal true', () => {
    component.onShowAssignmentModal(true);
    expect(modalService.onShowAssignmentModal).toHaveBeenCalledOnceWith(true);
  });
});
