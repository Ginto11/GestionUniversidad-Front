import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@envs/environment";
import { AuthService } from "../auth/auth.service";
import { desencriptar } from "src/app/util/util.encrypt";
import { Estudiante } from "src/app/models/Estudiante";

@Injectable({
    providedIn: 'root'
})
export class EstudiantesServices {

    constructor(private http: HttpClient, private authService: AuthService){}

    mostrarTodos(){

        let data = sessionStorage.getItem('user');

        if(!data){
            return null;
        }

        let usuario = JSON.parse(data);
        let token = desencriptar(usuario.token);

        return this.http.get<Estudiante[]>(`${environment.URL}/api/estudiantes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

    }
}