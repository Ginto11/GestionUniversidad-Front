import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstudianteLogin } from "../../models/EstudianteLogin";
import { Observable } from "rxjs";
import { EstudianteRegistrar } from "../../models/EstudianteRegistrar";

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    private URL = 'http://localhost:5008/api'

    constructor(private http: HttpClient){ }

    ingresar(usuario: EstudianteLogin): Observable<any> {

        return this.http.post(`${this.URL}/login/estudiantes/ingresar`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    registrar(usuario: EstudianteRegistrar): Observable<any> {
        return this.http.post(`${this.URL}/estudiantes`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}