import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ComunicacionService{
    private mostrarLinksSubject = new BehaviorSubject<boolean>(true);
    mostrarLinks = this.mostrarLinksSubject.asObservable();

    private mostrarFormEditarEstudianteSubject = new BehaviorSubject<boolean>(false);
    mostrarFormEditarEstudiante = this.mostrarFormEditarEstudianteSubject.asObservable();

    ocultarLinksEnModulos(valor: boolean): void{
        this.mostrarLinksSubject.next(valor);
    }

    activarFormEditarEstudiante(valor: boolean): void{
        this.mostrarFormEditarEstudianteSubject.next(valor);
    }

    getEstado(){
        return this.mostrarLinksSubject.getValue();
    }

    tokenExpirado(){
        window.location.href = '/iniciar-sesion';
        sessionStorage.removeItem('user');
    }

    recargarPagina(){
        window.location.reload();
    }



}