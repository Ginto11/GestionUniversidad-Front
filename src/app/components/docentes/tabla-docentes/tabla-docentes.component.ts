import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Docente } from 'src/app/models/docente.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { PaginacionDocentesComponent } from '../paginacion-docentes/paginacion-docentes.component';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-tabla-docentes',
    imports: [RouterLink, CommonModule, PaginacionDocentesComponent],
    templateUrl: './tabla-docentes.component.html',
    styleUrl: './tabla-docentes.component.css'
})
export default class TablaDocentesComponent {

    titleCopiado: string | null = "";
    numeroPagina = 1;
    tamanoPagina = 10;

    docentes: Docente[] = [];


    /**
     * CREA UNA INSTANCIA DEL COMPONENTE
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     * @param docenteService SERVICIO PARA OPERACIONES RELACIONADAS CON DOCENTES
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES 
     */
    constructor(
        private authService: AuthService,
        private docenteService: DocenteService,
        private tipoModalService: TipoModalService
    ) { }

    /**
     * METODO QUE RECIBE LA LISTA DE DOCENTES
     * @param lista LISTA DE DOCENTES DE LA PAGINACION
     */
    recibirDocentes = (lista: Docente[]): void => {
        this.docentes = lista;
    }
    
    /**
     * METODO QUE ELIMINA UN DOCENTE
     * @param id 
     * @returns {Promise<any>} UNA PROMESA CON UN VALOR DESCONOCIDO
     */
    eliminarDocente = async (id: number): Promise<any> => {
        try {

            if (await this.authService.validarSesion() === false) {
                this.tipoModalService.tokenExpirado();                
                return;
            }

            await this.docenteService.eliminar(id);
            this.tipoModalService.elementoEliminado('Docente eliminado exitosamente');

            const docentesActualizados = await this.docenteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            this.docentes = docentesActualizados;

        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * PERMITE COPIAR LA CEDULA DEL DOCENTE AL PORTAPAPELES
     * @param cedula 
     */
    copiarCedula = (cedula: number) => {
        navigator.clipboard.writeText(JSON.stringify(cedula));
        this.titleCopiado = "Copiado";
        this.tipoModalService.cedulaCopiada();
    }


}
