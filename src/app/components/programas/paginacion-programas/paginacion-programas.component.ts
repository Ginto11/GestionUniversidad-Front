import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Programa } from 'src/app/models/programa.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { ProgramaService } from 'src/app/services/programas/programas.service';

@Component({
    selector: 'app-paginacion-programas',
    imports: [],
    templateUrl: './paginacion-programas.component.html',
    styleUrl: './paginacion-programas.component.css'
})
export class PaginacionProgramasComponent {


    @Input() numeroPagina!: number;
    @Input() tamanoPagina!: number;

    @Output() enviarProgramas = new EventEmitter<Programa[]>();

    /**
     * 
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param estudianteService SERVICIO PARA OPERACIONES RELACIONADAS CON PROGRAMAS
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     */
    constructor(
        private tipoModalService: TipoModalService,
        private programaService: ProgramaService, 
        private authService: AuthService
    ){ }

    ngOnInit(): void {
        this.init();
    }

    /**
     * METODO QUE TRAE LOS PROGRAMAS PAGINADOS
     * @returns { Promise<Estudiante[]> } PROMESA DE LISTA DE PROGRAMAS
     */
    listarPaginacion = async (): Promise<Programa[]> => {
        try {
            
            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return [];
            }
            
            const programas = await this.programaService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            return programas;

        } catch (error) {
            this.tipoModalService.manejoError(error);
            return [];
        }
    }

    init = async () => {
        const lista = await this.listarPaginacion();
        this.enviarProgramas.emit(lista);
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

        this.enviarProgramas.emit(lista);
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
        this.enviarProgramas.emit(lista);
    }

}
