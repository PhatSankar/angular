import { Injectable } from "@angular/core";
import { BodyClient } from "../clients/body.client";
import { Observable } from "rxjs";
import { Department } from "../../../models/department.model";

@Injectable({
    providedIn: "root"
})
export class BodyService {
    constructor(private bodyClient: BodyClient){}

    getDepartments(): Observable<Department[]> {
        return this.bodyClient.getAllDepartmentWithEmployee();
    }
}