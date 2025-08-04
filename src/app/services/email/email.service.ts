import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { lastValueFrom } from 'rxjs';
import { MensajeEmail } from 'src/app/models/mensaje-email.model';

@Injectable({providedIn: 'root'})
export class EmailService {
    constructor(private http: HttpClient) { }


    enviarEmail = async (data: MensajeEmail): Promise<any> => {
        
        try {
            
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            })

            return await lastValueFrom(
                this.http.post(`${environment.URL}/api/email`, data, { headers })
            )

        } catch (error) {
            throw error;
        }


    }

}