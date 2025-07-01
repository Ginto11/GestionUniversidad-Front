import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavSesionComponent } from 'src/app/shared/nav-sesion/nav-sesion.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { IEstudiante } from 'src/app/interfaces/IEstudiante';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-estudiantes',
    imports: [NavSesionComponent, RouterOutlet, RouterLinkActive, RouterLink],
    templateUrl: './estudiantes.component.html',
    styleUrl: './estudiantes.component.css'
})
export default class EstudiantesComponent implements OnInit {

    nombreUser!: string;
    isUserLogue!: boolean;
    estudiantes!: IEstudiante[];

    isMostrarTabla = true;
    isMostrarForm = false;
    isMostrarFormEditarEstudiante = false;

    constructor(private router: Router, private estudianteService: EstudianteServices, private comunicacionService: ComunicacionService, private viewportScroller: ViewportScroller) {
        this.viewportScroller.scrollToPosition([0, 0]);
     }

    ngOnInit(): void {
        console.log('c estudiantes')
        this.validarSesion();
        this.mostrarEstudiantes();
        this.comunicacionService.ocultarLinksEnModulos(false);
    }

    //VALIDA LA SESION POR MEDIO DEL SESION STORAGE SI NO HAY USER DIRECCIONA AL HOME
    validarSesion = () => {
        this.nombreUser = JSON.parse(sessionStorage.getItem('usuario') || '{}').nombre;
        (!this.nombreUser) ? this.router.navigate(['/']) : this.isUserLogue = true;
    }

    //MUESTRA TODOS LOS ESTUDIANTES CUANDO SE ABRE EL MODULO (ESTUDIANTES)
    mostrarEstudiantes = async () => {
        try {
            const data = await this.estudianteService.listarEstudiantes();
            this.estudiantes = data;
        } catch (error) {
            console.log(error);
        }
    };

}
