import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { lastValueFrom } from 'rxjs';
import { Facultad } from 'src/app/models/facultad.model';
import { desencriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';

@Injectable({providedIn: 'root'})
export class FacultadService {
    constructor(private http: HttpClient) { }

    traerFacultades = async (): Promise<Facultad[]> => {
        try {
            
            const data = buscarEnSesionStorage('usuario');

            if(data){

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })

                return await lastValueFrom(
                    this.http.get<Facultad[]>(`${environment.URL}/api/facultades`, { headers })
                )

            }

            return [];

        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
}