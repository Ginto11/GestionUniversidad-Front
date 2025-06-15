import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ComunicacionService{
    private mostrarLinksSubject = new BehaviorSubject<boolean>(true);
    mostrarLinks = this.mostrarLinksSubject.asObservable();

    ocultarLinksEnModulos(valor: boolean): void{
        this.mostrarLinksSubject.next(valor);
    }

    getEstado(){
        return this.mostrarLinksSubject.getValue();
    }

}