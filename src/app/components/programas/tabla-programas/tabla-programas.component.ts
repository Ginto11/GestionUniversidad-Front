import { Component } from '@angular/core';
import { Programa } from 'src/app/models/programa.model';
import { PaginacionProgramasComponent } from '../paginacion-programas/paginacion-programas.component';
import { environment } from '@envs/environment';
import { ProgramaService } from 'src/app/services/programas/programas.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tabla-programas',
    imports: [PaginacionProgramasComponent, RouterLink],
    templateUrl: './tabla-programas.component.html',
    styleUrl: './tabla-programas.component.css'
})
export default class TablaProgramasComponent {
    numeroPagina = 1;
    tamanoPagina = 6;

    urlImagenes = environment.IMG_URL;
    programas: Programa[] = [];


    constructor(
       private programaService: ProgramaService,
       private tipoModalService: TipoModalService,
       private authService: AuthService
    ) { }

    /**
     * METODO QUE RECIBE LA LISTA DE PROGRAMAS
     * @param lista LISTA DE PROGRAMAS DEL COMPONENTE PAGINACION
     */
    recibirProgramas = (lista: Programa[]): void => {
        this.programas = lista;
    }

    eliminarPrograma = async (id: number): Promise<void> => {
        try {

            if(await this.authService.validarSesion() === false) {
                this.tipoModalService.tokenExpirado();
                return;
            }

            await this.programaService.eliminar(id);
            this.tipoModalService.elementoEliminado('Programa eliminado exitosamente.');

            const programasActualizados = await this.programaService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            this.programas = programasActualizados;
        }catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    

}
