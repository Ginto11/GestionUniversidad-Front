import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { FormsModule } from '@angular/forms';
import { IGenero } from 'src/app/interfaces/IGenero';
import { GenerosServices } from 'src/app/services/generos/generos.service';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { OverlayComponent } from 'src/app/shared/overlay/overlay.component';

@Component({
    selector: 'app-editar-estudiante',
    imports: [FormsModule, RouterLink, OverlayComponent],
    templateUrl: './editar-estudiante.component.html',
    styleUrl: './editar-estudiante.component.css'
})
export default class EditarEstudianteComponent implements OnInit {

    nombreFormulario: string = 'Editando Estudiante';
    estudiante: Estudiante = new Estudiante;
    generos: IGenero[] = [];
    activarOverlay = false;
    confirmacion_contrasena = '';
    
    accionesOverlay = {
            redireccionar: false,
            ocultar: false
        }
    
        
    opciones: IOpcionesOverlay =  {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista: []
    };

    constructor(
        private activatedRoute: ActivatedRoute, 
        private estudiantesService: EstudianteServices, 
        private generosService: GenerosServices, 
        private authService: AuthService,
        private router: Router) { }


    ngOnInit(): void {
        this.mostrarEstudiante();
    }


    mostrarEstudiante = async () => {
        try{
            const id = this.activatedRoute.snapshot.params['id'];
            if(id){
                this.estudiante = await this.estudiantesService.buscarPorId(id);
                console.log(this.estudiante)
                this.traerGeneros();
            }
        }catch (error) {
            console.error('Error al cargar el estudiante:', error);
        }
    }


    traerGeneros = async () => {
        try {
            this.generos = await this.generosService.listarGeneros();
        } catch (error) {
            console.error('Error al cargar los géneros:', error);
        }
    }


    actualizar = async (id: number) => {
        try {
            if(await this.authService.validarSesion() === false) {
                this.redireccionarOverlay('Inicie sesión para poder continuar.', '/icons/informacion.png', '#1A1731', 'IconInformacion', []);
                this.activarOverlay = true;
                return;
            }

            const res = await this.estudiantesService.actualizar(id, this.estudiante);
            
            if(res == null){
                this.ocultarOverlay('Estudiante actualizado (verificar en la tabla).', '/icons/informacion.png', '#1A1731', 'IconInformacion', []);
                this.activarOverlay = true;
            }

        } catch (error) {
            this.redireccionarOverlay(`Error al actualizar`, '/icons/error.png', 'red', 'IconError', []);
            this.activarOverlay = true;
            return;
        }
    }

    redireccionarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = true;
        this.accionesOverlay.ocultar = false;
    }

    ocultarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = false;
        this.accionesOverlay.ocultar = true;
    }

    recibirDatoOcultar = (dato: boolean) => {
        if(dato){
            this.activarOverlay = false;
        }
    }

    
}