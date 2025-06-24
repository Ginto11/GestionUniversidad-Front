import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { desencriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { OverlayComponent } from '../../../shared/overlay/overlay.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { RouterLink } from '@angular/router';
import { IEstudiante } from 'src/app/interfaces/IEstudiante';
import { Estudiante } from 'src/app/models/estudiante.model';

@Component({
    selector: 'app-tabla-estudiantes',
    imports: [OverlayComponent, RouterLink],
    templateUrl: './tabla-estudiantes.component.html',
    styleUrl: './tabla-estudiantes.component.css'
})
export default class TablaEstudiantesComponent implements OnInit {
    
    estudiantes: Estudiante[] = [];

    accionesOverlay = {
        redireccionar: false,
        ocultar: false
    }

    activarOverlay = false;
    
    opciones: IOpcionesOverlay =  {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista: []
    };
    

    constructor(private authService: AuthService, private estudianteService: EstudianteServices, private comunicacionService: ComunicacionService) { }

    ngOnInit(): void {
        this.mostrarEstudiantes();
    }


    mostrarEstudiantes = async () => {
        try {
            if(await this.authService.validarSesion() == false) {
                this.redireccionarOverlay('Inicie sesión para poder continuar.', '/icons/informacion.png', '#1A1731', 'IconInformacion', []);
                this.activarOverlay = true;
                return;
            }

            const data = await this.estudianteService.listarEstudiantes();
            console.log(data);
            this.estudiantes = data;
        } catch (error) {
            this.ocultarOverlay('Error al cargar los estudiantes.', '/icons/error.png', 'red', 'IconError', []);
            this.activarOverlay = true;
        }
    }

    
    eliminarEstudiante = async (id: number): Promise<any> => {
        try {

            if(await this.authService.validarSesion() === false) {
                this.redireccionarOverlay('Inicie sesión para poder continuar.', '/icons/informacion.png', '#1A1731', 'IconInformacion', []);
                this.activarOverlay = true;
                return;
            }

            const res = await this.estudianteService.eliminar(id);
            const estudiantesActualizados = await this.estudianteService.listarEstudiantes();
            this.estudiantes = estudiantesActualizados;
            
            this.ocultarOverlay('Estudiante eliminado exitosamente', '/icons/comprobado.png', 'green', 'IconComprobado', []);
            this.activarOverlay = true;

            return res;
            } catch (error) {
                this.ocultarOverlay('Error al eliminar el estudiante (verifique y si el estudiante tiene matricula no se puede eliminar)', '/icons/error.png', 'red', 'IconError', []);
                this.activarOverlay = true;
            }
    }

    recibirDatoOcultar = (dato: boolean) => {
        if(dato){
            this.activarOverlay = false;
        }
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

    redireccionarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = true;
        this.accionesOverlay.ocultar = false;
    }

}
