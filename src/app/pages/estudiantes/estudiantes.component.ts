import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavSesionComponent } from 'src/app/components/nav-sesion/nav-sesion.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { TablaEstudiantesComponent } from 'src/app/components/tabla-estudiantes/tabla-estudiantes.component';
import { Estudiante } from 'src/app/interfaces/Estudiante';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { FormNuevosUsuariosComponent } from 'src/app/components/form-nuevos-usuarios/form-nuevos-usuarios.component';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-estudiantes',
    imports: [NavSesionComponent, TablaEstudiantesComponent, FormNuevosUsuariosComponent],
    templateUrl: './estudiantes.component.html',
    styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

    nombreUser!: string;
    isUserLogue!: boolean;
    estudiantes!: Estudiante[];

    isMostrarTabla = true;
    isMostrarForm = false;

    constructor(private router: Router, private estudianteService: EstudianteServices, private comunicacionService: ComunicacionService, private viewportScroller: ViewportScroller) {
        this.viewportScroller.scrollToPosition([0, 0]);
     }

    ngOnInit(): void {
        console.log('Inicio');
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
    mostrarEstudiantes = async () => {
        try {
            const data = await this.estudianteService.mostrarTodos();
            this.estudiantes = data;
        } catch (error) {
            console.log(error);
        }
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
