import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioLogin } from "../../models/UsuarioLogin";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    private URL = 'http://localhost:5008/api'

    constructor(private http: HttpClient){ }

    ingresar(usuario: UsuarioLogin): Observable<any> {
        return this.http.post(`${this.URL}/login/estudiantes/ingresar`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}