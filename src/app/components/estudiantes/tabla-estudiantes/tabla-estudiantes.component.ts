import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayComponent } from '../../../shared/overlay/overlay.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { RouterLink } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante.model';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from 'src/app/components/estudiantes/paginacion-estudiantes/paginacion.component';

@Component({
    selector: 'app-tabla-estudiantes',
    imports: [OverlayComponent, RouterLink, CommonModule, PaginacionComponent],
    templateUrl: './tabla-estudiantes.component.html',
    styleUrl: './tabla-estudiantes.component.css'
})
export default class TablaEstudiantesComponent {
    
    titleCopiado: string | null = "";
    numeroPagina = 1;
    tamanoPagina = 10;

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

    /*
        RECIBE LA LISTA DE ESTUDIANTES DESDE EL COMPONENTE PAGINACION
        Y LA ASIGNA A LA VARIABLE ESTUDIANTES PARA MOSTRARLA EN LA TABLA
    */
    recibirEstudiantes = (lista: Estudiante[]): void => {
        this.estudiantes = lista;
    }

   
    
    eliminarEstudiante = async (id: number): Promise<any> => {
        try {

            if(await this.authService.validarSesion() === false) {
                this.redireccionarOverlay('Inicie sesión para poder continuar.', 'informacion.webp', '#1A1731', 'Informacion', []);
                this.activarOverlay = true;
                return;
            }

            const res = await this.estudianteService.eliminar(id);
            this.ocultarOverlay('Estudiante eliminado exitosamente', 'comprobado.webp', '#1A1731', 'Comprobado', []);
            this.activarOverlay = true;

            const estudiantesActualizados = await this.estudianteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            this.estudiantes = estudiantesActualizados;
            
            return res;
            } catch (error) {
                this.ocultarOverlay('Error al eliminar el estudiante (verifique y si el estudiante tiene matricula no se puede eliminar)', 'error.webp', 'red', 'Error', []);
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

    copiarCedula = (cedula: number) => {
        navigator.clipboard.writeText(JSON.stringify(cedula));
        this.titleCopiado = "Copiado";
    }

}
