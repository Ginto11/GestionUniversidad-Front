import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@envs/environment";
import { AuthService } from "../auth/auth.service";
import { desencriptar } from "src/app/util/util.encrypt";
import { lastValueFrom } from "rxjs";
import { buscarEnSesionStorage } from "src/app/util/utilidad";
import { IEstudianteRegistrar } from "src/app/interfaces/IEstudianteRegistrar";
import { Estudiante } from "src/app/models/estudiante.model";

@Injectable({
    providedIn: 'root'
})
export class EstudianteServices {

    constructor(private http: HttpClient, private authService: AuthService){}

    listarEstudiantes = async (): Promise<Estudiante[]> => {
        try {
            const data = buscarEnSesionStorage('usuario');

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

    listarPaginado = async (nPagina: number, nMostrar: number): Promise<Estudiante[]> => {
        try {
            const data = buscarEnSesionStorage('usuario');

            if(data){
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
        
                return await lastValueFrom(
                    this.http.get<Estudiante[]>(`${environment.URL}/api/estudiantes/${nPagina}/${nMostrar}`, { headers })
                );
            }

            return [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    buscarPorId = async (id: number): Promise<Estudiante> => {
        try {

            const usuario = buscarEnSesionStorage('usuario');

            if(usuario){
                
                const token = desencriptar(usuario.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });
                    
                return await lastValueFrom(
                    this.http.get<Estudiante>(`${environment.URL}/api/estudiantes/${id}`, { headers })
                );
            }

            throw new Error('Usuario no encontrado en sesión');

        } catch (error) {
            throw error;
        }
    }

    eliminar = async (id: number): Promise<any> => {
        try {

            const data = buscarEnSesionStorage('usuario');

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


    crear = async (estudiante: IEstudianteRegistrar) : Promise<any> => {
        try{

            const data = buscarEnSesionStorage('usuario');

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

    actualizar = async (id: number, estudiante: Estudiante): Promise<any> => {
        try {
            
            const data = buscarEnSesionStorage('usuario');

            if(data){

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.put(`${environment.URL}/api/estudiantes/${id}`, estudiante, { headers })
                )
            }

        } catch (error) {
            throw error;
        }
    }

}