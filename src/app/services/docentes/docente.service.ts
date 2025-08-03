import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { desencriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { lastValueFrom } from 'rxjs';
import { environment } from '@envs/environment';
import { IDocenteRegistrar } from 'src/app/interfaces/IDocenteRegistrar';

@Injectable({ providedIn: 'root' })
export class DocenteService {

    constructor(private http: HttpClient) { }

    listarDocentes = async (): Promise<Docente[]> => {
        try {

            const data = buscarEnSesionStorage('usuario');

            if (data) {

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })

                return await lastValueFrom(
                    this.http.get<Docente[]>(`${environment.URL}/api/docentes`, { headers })
                );
            }

            return [];
        } catch (error) {
            throw error;
        }
    }

    listarPaginado = async (nPagina: number, nMostrar: number): Promise<Docente[]> => {
        try {
            const data = buscarEnSesionStorage('usuario');

            if (data) {
                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })

                return await lastValueFrom(
                    this.http.get<Docente[]>(`${environment.URL}/api/docentes/${nPagina}/${nMostrar}`, { headers })
                );
            }

            return [];
        } catch (error) {
            throw error;
        }
    }

    buscarPorId = async (id: number): Promise<Docente> => {
        try {

            const usuario = buscarEnSesionStorage('usuario');

            if (usuario) {

                const token = desencriptar(usuario.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.get<Docente>(`${environment.URL}/api/docentes/${id}`, { headers })
                );
            }

            throw new Error('Usuario no encontrado en sesión');

        } catch (error) {
            throw error;
        }
    }

    buscarPorCedula = async (cedula: number): Promise<Docente> => {
        try {

            const usuario = buscarEnSesionStorage('usuario');

            if (usuario) {

                const token = desencriptar(usuario.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.get<Docente>(`${environment.URL}/api/docentes/buscar/${cedula}`, { headers })
                );
            }

            throw new Error('Usuario no encontrado en sesión');

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    eliminar = async (id: number): Promise<any> => {
        try {

            const data = buscarEnSesionStorage('usuario');

            if (data) {

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.delete(`${environment.URL}/api/docentes/${id}`, { headers })
                );
            }
        } catch (error) {
            throw error;
        }
    }


    crear = async (docente: IDocenteRegistrar): Promise<any> => {
        try {

            const data = buscarEnSesionStorage('usuario');

            if (data) {

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })

                return await lastValueFrom(
                    this.http.post(`${environment.URL}/api/docentes`, docente, { headers })
                );

            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    actualizar = async (id: number, docente: Docente): Promise<any> => {
        try {

            const data = buscarEnSesionStorage('usuario');

            if (data) {

                const token = desencriptar(data.token);

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                });

                return await lastValueFrom(
                    this.http.put(`${environment.URL}/api/docentes/${id}`, docente, { headers })
                )
            }

        } catch (error) {
            throw error;
        }
    }
}