import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstudianteLogin } from "../../models/EstudianteLogin";
import { Observable } from "rxjs";
import { EstudianteRegistrar } from "../../models/EstudianteRegistrar";
import { environment } from "@envs/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor(private http: HttpClient){ }

    ingresar(usuario: EstudianteLogin): Observable<any> {
        return this.http.post(`${environment.URL}/login/estudiantes/ingresar`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    registrar(usuario: EstudianteRegistrar): Observable<any> {
        return this.http.post(`${environment.URL}/estudiantes`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    verificarToken(token: string): Observable<any> {
        return this.http.get(`${environment.URL}/login/validar_token`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }


    decodificarToken(token: string): Observable<any> {
        return this.http.get(`${environment.URL}/login/decodificar_token`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

}