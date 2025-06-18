import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavSesionComponent } from 'src/app/components/nav-sesion/nav-sesion.component';
import { EstudiantesServices } from 'src/app/services/estudiantes/estudiantes.service';
import { TablaEstudiantesComponent } from 'src/app/components/tabla-estudiantes/tabla-estudiantes.component';
import { Estudiante } from 'src/app/interfaces/Estudiante';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { FormNuevosEstudiantesComponent } from 'src/app/components/form-nuevos-estudiantes/form-nuevos-estudiantes.component';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-estudiantes',
    imports: [NavSesionComponent, TablaEstudiantesComponent, FormNuevosEstudiantesComponent],
    templateUrl: './estudiantes.component.html',
    styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

    nombreUser!: string;
    isUserLogue!: boolean;
    estudiantes!: Estudiante[];

    isMostrarTabla = true;
    isMostrarForm = false;

    constructor(private router: Router, private estudiantesService: EstudiantesServices, private comunicacionService: ComunicacionService) { }

    ngOnInit(): void {
        this.validarSesion();
        this.mostrarEstudiantes();
        this.comunicacionService.ocultarLinksEnModulos(false);
    }

    //VALIDA LA SESION POR MEDIO DEL SESION STORAGE SI NO HAY USER DIRECCIONA AL HOME
    validarSesion = () => {
        this.nombreUser = JSON.parse(sessionStorage.getItem('user') || '{}').nombre;
        (!this.nombreUser) ? this.router.navigate(['/']) : this.isUserLogue = true;
    }

    //MUESTRA TODOS LOS ESTUDIANTES CUANDO SE ABRE EL MODULO (ESTUDIANTES)
    mostrarEstudiantes = () => {
        this.estudiantesService.mostrarTodos()?.subscribe({
            next: res => this.estudiantes = res,
            error: error => `Error: ${error}`
        })
    };

    

    mostrarTabla = (): void => {
        this.isMostrarTabla = true;
        this.isMostrarForm = false;
    }

    mostrarForm = () => {
        this.isMostrarForm = true;
        this.isMostrarTabla = false;
    }

}
