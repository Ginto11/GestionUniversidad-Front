import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@envs/environment";
import { lastValueFrom } from "rxjs";
import { Programa } from "src/app/models/programa.model";
import { buscarEnSesionStorage } from "src/app/util/utilidad";
import { desencriptar } from "src/app/util/util.encrypt";

@Injectable({
    providedIn: 'root'
})
export class ProgramaService {

    constructor(private http: HttpClient){}

    listarProgramas = async(): Promise<Programa[]> => {
        try {

            const headers = {
                'Content-Type': 'application/json'
            }

            return await lastValueFrom(
                this.http.get<Programa[]>(`${environment.URL}/api/programas`, { headers })
            );

        } catch (error) {
            throw error;
        }
    }

    listarPaginado = async (nPagina: number, nMostrar: number): Promise<Programa[]> => {
        try {
            const data = buscarEnSesionStorage('usuario');

            if(data){
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
        
                return await lastValueFrom(
                    this.http.get<Programa[]>(`${environment.URL}/api/programas/${nPagina}/${nMostrar}`, { headers })
                );
            }

            return [];
        } catch (error) {
            throw error;
        }
    }


    buscarPorId = async (id: number): Promise<Programa> => {
        try {

            const usuario = buscarEnSesionStorage('usuario');

            if(usuario){
                
                const token = desencriptar(usuario.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });
                    
                return await lastValueFrom(
                    this.http.get<Programa>(`${environment.URL}/api/programas/${id}`, { headers })
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
                    this.http.delete(`${environment.URL}/api/programas/${id}`, { headers })
                );
            }
        }catch(error){
            throw error;
        }
    }


    crear = async (formData: FormData) : Promise<any> => {
        try{
            const data = buscarEnSesionStorage('usuario');

            if(data){
            
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
                
                return await lastValueFrom(
                    this.http.post(`${environment.URL}/api/programas`, formData, { headers })
                );
            
            }
        }catch(error){
            throw error;
        }
    }

    actualizar = async (id: number, programa: Programa): Promise<any> => {
        try {
            
            const data = buscarEnSesionStorage('usuario');

            if(data){

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.put(`${environment.URL}/api/programas/${id}`, programa, { headers })
                )
            }

        } catch (error) {
            throw error;
        }
    }
}