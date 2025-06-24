import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGenero } from 'src/app/interfaces/IGenero';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { lastValueFrom } from 'rxjs';
import { environment } from '@envs/environment';
import { desencriptar } from 'src/app/util/util.encrypt';

@Injectable({
    providedIn: 'root'
})

export class GenerosServices {

    constructor(private http: HttpClient){}

    listarGeneros = async (): Promise<IGenero[]> => {
        try{
            const usuario = buscarEnSesionStorage('usuario');

            if(usuario){

                const token = desencriptar(usuario.token);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };


                return await lastValueFrom(
                    this.http.get<IGenero[]>(`${environment.URL}/api/generos`, { headers })
                );
            }

            return [];

        }catch (error) {
            throw error;
        }
    } 
}
