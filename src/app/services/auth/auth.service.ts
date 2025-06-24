import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IEstudianteLogin } from "../../interfaces/IEstudianteLogin";
import { IEstudianteRegistrar } from "../../interfaces/IEstudianteRegistrar";
import { environment } from "@envs/environment";
import { lastValueFrom } from "rxjs";
import { buscarEnSesionStorage } from "src/app/util/utilidad";
import { desencriptar } from "src/app/util/util.encrypt";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor(private http: HttpClient){ }


    validarSesion = async (): Promise<boolean> => {
        try {
            const usuario = buscarEnSesionStorage('usuario');

            if(!usuario) {
                return false;
            }

            const token = desencriptar(usuario.token);
            const res = await this.verificarToken(token);
            if (res.codigo == 200) { return true; }

            return false;

        } catch (error) {
            return false;
        }
    };

    ingresar = async (usuario: IEstudianteLogin): Promise<any> => {
        try {

            const headers = {
                'Content-Type': 'application/json'
            }

            return await lastValueFrom(
                this.http.post(`${environment.URL}/api/login/estudiantes/ingresar`, usuario, { headers })
            );
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    registrar = async (usuario: IEstudianteRegistrar): Promise<any> => {
        try {
            
            const headers = {
                'Content-Type': 'application/json'
            }

            return await lastValueFrom(
                this.http.post(`${environment.URL}/api/estudiantes`, usuario, { headers })
            );

        } catch (error) {
            throw error;                
        }

    }

    verificarToken = async (token: string): Promise<any> => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };  

            return await lastValueFrom(
                this.http.get(`${environment.URL}/api/login/validar_token`, { headers })
            );
        } catch (error) {
            throw error;
        }
    }


    decodificarToken = async (token: string): Promise<any> => {
        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            return await lastValueFrom(
                this.http.get(`${environment.URL}/api/login/decodificar_token`, { headers })
            );

        } catch (error) {
            throw error;
        }
    }

}