import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { Estudiante } from 'src/app/models/estudiante.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { OverlayComponent } from 'src/app/shared/overlay/overlay.component';

@Component({
  selector: 'app-paginacion',
  imports: [OverlayComponent],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent implements OnInit{

    @Input() numeroPagina!: number;
    @Input() tamanoPagina!: number;

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

    @Output() enviarEstudiantes = new EventEmitter<Estudiante[]>();

    constructor(private estudiantesService: EstudianteServices, private authService: AuthService){ }

    ngOnInit(): void {
        this.init();
    }

    listarPaginacion = async (): Promise<Estudiante[]> => {
        try {
            if(await this.authService.validarSesion() == false) {
                this.redireccionarOverlay('Inicie sesión para poder continuar.', '/icons/informacion.png', '#1A1731', 'IconInformacion', []);
                this.activarOverlay = true;
                return [];
            }

            const estudiantes = await this.estudiantesService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            
            return estudiantes;

        } catch (error) {
            this.ocultarOverlay('Error al cargar los estudiantes.', '/icons/error.png', 'red', 'IconError', []);
            this.activarOverlay = true;
            return [];
        }
    }

    init = async () => {
        const lista = await this.listarPaginacion();
        this.enviarEstudiantes.emit(lista);
    }

    siguiente = async () => {
        
        this.numeroPagina++;
        const lista = await this.listarPaginacion();
        if(lista.length == 0){
            alert('No hay mas datos por mostrar.');
            this.numeroPagina = this.numeroPagina -1;
            return;
        }

        this.enviarEstudiantes.emit(lista);
    }

    anterior = async () => {

        if(this.numeroPagina == 1){
            this.numeroPagina = 1;
            return;
        }
        
        this.numeroPagina--;
        const lista = await this.listarPaginacion();
        this.enviarEstudiantes.emit(lista);
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
