import { Component, OnInit } from '@angular/core';
import { BodyService } from './services/body.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  providers: [BodyService]
})
export class BodyComponent implements OnInit {

  department$: Observable<Department[]> = new BehaviorSubject([]) 

  constructor(private bodyService : BodyService){}
  ngOnInit(): void {
    this.department$ = this.bodyService.getDepartments()
  }


}
