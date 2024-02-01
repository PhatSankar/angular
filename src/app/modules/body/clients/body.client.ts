import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../../../models/department.model";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: "root"
})
export class BodyClient {
    constructor(private httpClient: HttpClient){}
    getAllDepartmentWithEmployee() : Observable<Department[]> {
        return this.httpClient.get<Department[]>("http://localhost:8080/jakartaee-hello-world/departments");
    }
}