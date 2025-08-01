import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-paginacion-docentes',
    imports: [],
    templateUrl: './paginacion-docentes.component.html',
    styleUrl: './paginacion-docentes.component.css'
})
export class PaginacionDocentesComponent {
    @Input() numeroPagina!: number;
    @Input() tamanoPagina!: number;

    @Output() enviarDocentes = new EventEmitter<Docente[]>();

    /**
     * CREA UNA INSTANCIA DEL COMPONENTE    
     * @param docenteService SERVICIO PARA OPERACIONES RELACIONADAS CON DOCENTES
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     */
    constructor(
        private docenteService: DocenteService, 
        private authService: AuthService,
        private tipoModalService: TipoModalService    
    ){ }


    ngOnInit(): void {
        this.init();
    }

    /**
     * METODO QUE TRAE LOS DOCENTES PAGINADOS
     * @returns { Promise<Docente[]> } LISTA DE DOCENTES
     */
    listarPaginacion = async (): Promise<Docente[]> => {
        try {
            
            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return [];
            }
            
            const docentes = await this.docenteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            
            return docentes;

        } catch (error) {
            this.tipoModalService.manejoError(error);
            return [];
        }
    }

    /**
     * METODO QUE TRAE LA LISTA DE DOCENTES Y LOS PASA AL COMPONENTE PADRE
     */
    init = async () => {
        const lista = await this.listarPaginacion();
        this.enviarDocentes.emit(lista);
    }

    /**
     * METODO QUE PASA A LA SIGUIENTE PAGINA DE DOCENTES
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

        this.enviarDocentes.emit(lista);
    }

    /**
     * METODO QUE TRAE LA PAGINA ANTERIOR DE DOCENTES
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
        this.enviarDocentes.emit(lista);
    }

}
