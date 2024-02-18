import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal/modal.service';
import { of } from 'rxjs';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent],
      providers: [ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should call onClickBackgroud and set all property to false', () => {
    component.isShowAssignmentModal = true;
    component.isShowDepartmentModal = true;
    component.isShowEmployeeModal = true;
    component.isShowProjectModal = true;

    expect(component.isShowDepartmentModal).toBeTrue();
    expect(component.isShowEmployeeModal).toBeTrue();
    expect(component.isShowProjectModal).toBeTrue();
    expect(component.isShowAssignmentModal).toBeTrue();

    component.onClickBackground();
    expect(component.isShowDepartmentModal).toBeFalse();
    expect(component.isShowEmployeeModal).toBeFalse();
    expect(component.isShowProjectModal).toBeFalse();
    expect(component.isShowAssignmentModal).toBeFalse();
  });
});
