import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@envs/environment";

@Injectable({
    providedIn: 'root'
})
export class ProgramasService {

    constructor(private http: HttpClient){}

    listarProgramas(){
        return this.http.get(`${environment.URL}/programas`);
    }
}