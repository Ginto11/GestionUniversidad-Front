import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@envs/environment";
import { AuthService } from "../auth/auth.service";
import { desencriptar } from "src/app/util/util.encrypt";
import { Estudiante } from "src/app/interfaces/Estudiante";
import { lastValueFrom } from "rxjs";
import { buscarEnSesionStorage } from "src/app/util/utilidad";
import { EstudianteRegistrar } from "src/app/interfaces/EstudianteRegistrar";

@Injectable({
    providedIn: 'root'
})
export class EstudianteServices {

    constructor(private http: HttpClient, private authService: AuthService){}

    async mostrarTodos(): Promise<Estudiante[]>{
        try {
            const data = buscarEnSesionStorage('user');

            if(data){
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
        
                return await lastValueFrom(
                    this.http.get<Estudiante[]>(`${environment.URL}/api/estudiantes`, { headers })
                );
            }

            return [];

        } catch (error) {
            throw error;
        }

    }

    async eliminar(id: number): Promise<any> {
        try {

            const data = buscarEnSesionStorage('user');

            if(data){

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.delete(`${environment.URL}/api/estudiantes/${id}`, { headers })
                );
            }
        }catch(error){
            throw error;
        }
    }


    async crear(estudiante: EstudianteRegistrar) : Promise<any> {
        try{

            const data = buscarEnSesionStorage('user');

            if(data){
            
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
            
                return await lastValueFrom(
                    this.http.post(`${environment.URL}/api/estudiantes`, estudiante, { headers })
                );
            
            }
        }catch(error){
            throw error;
        }
    }

}