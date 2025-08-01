import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recurso',
    imports: [RouterLink],
    templateUrl: './recurso.component.html',
    styleUrl: './recurso.component.css'
})
export class RecursoComponent {

    rutaInicial = "/icons/";

    @Input() icono = "";
    @Input() nombreRecurso = "";
    @Input() altImg = "";
    @Input() ruta = "";
}
