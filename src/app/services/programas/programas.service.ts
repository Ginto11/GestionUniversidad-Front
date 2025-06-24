import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@envs/environment";
import { IPrograma } from "src/app/interfaces/IProgramas";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProgramasService {

    constructor(private http: HttpClient){}

    listarProgramas = async(): Promise<IPrograma> => {
        try {
            
            const headers = {
                'Content-Type': 'application/json'
            }

            return await lastValueFrom(
                this.http.get<IPrograma>(`${environment.URL}/api/programas`, { headers })
            );
        } catch (error) {
            throw error;
        }
    }
}