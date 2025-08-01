import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent implements OnInit{

    @Input() numeroPagina!: number;
    @Input() tamanoPagina!: number;

    @Output() enviarEstudiantes = new EventEmitter<Estudiante[]>();

    /**
     * 
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param estudianteService SERVICIO PARA OPERACIONES RELACIONADAS CON ESTUDIANTES
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     */
    constructor(
        private tipoModalService: TipoModalService,
        private estudianteService: EstudianteServices, 
        private authService: AuthService
    ){ }

    ngOnInit(): void {
        this.init();
    }

    /**
     * METODO QUE TRAE LOS ESTUDIANTES PAGINADOS
     * @returns { Promise<Estudiante[]> } PROMESA DE LISTA DE ESTUDIANTES
     */
    listarPaginacion = async (): Promise<Estudiante[]> => {
        try {
            
            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return [];
            }
            
            const estudiantes = await this.estudianteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            return estudiantes;

        } catch (error) {
            this.tipoModalService.manejoError(error);
            return [];
        }
    }

    init = async () => {
        const lista = await this.listarPaginacion();
        this.enviarEstudiantes.emit(lista);
    }

    /**
     * METODO QUE PASA A LA SIGUIENTE PAGINA DE ESTUDIANTES
     */
    siguiente = async () => {
        
        if(await this.authService.validarSesion() == false){
            this.tipoModalService.tokenExpirado();
            return;
        }

        this.numeroPagina++;
        const lista = await this.listarPaginacion();
        if(lista.length == 0){
            this.tipoModalService.ultimaPagina();
            this.numeroPagina = this.numeroPagina -1;
            return;
        }

        this.enviarEstudiantes.emit(lista);
    }

    /**
     * METODO QUE TRAE LA PAGINA ANTERIOR DE ESTUDIANTES
     */
    anterior = async () => {

        if(await this.authService.validarSesion() == false){
            this.tipoModalService.tokenExpirado();
            return;
        }

        if(this.numeroPagina == 1){
            this.numeroPagina = 1;
            return;
        }
        
        this.numeroPagina--;
        const lista = await this.listarPaginacion();
        this.enviarEstudiantes.emit(lista);
    }

}
