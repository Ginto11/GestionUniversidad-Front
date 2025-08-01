import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { RouterLink } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante.model';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from 'src/app/components/estudiantes/paginacion-estudiantes/paginacion.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-tabla-estudiantes',
    imports: [RouterLink, CommonModule, PaginacionComponent],
    templateUrl: './tabla-estudiantes.component.html',
    styleUrl: './tabla-estudiantes.component.css'
})
export default class TablaEstudiantesComponent {
    
    titleCopiado: string | null = "";
    numeroPagina = 1;
    tamanoPagina = 10;

    estudiantes: Estudiante[] = [];


    constructor(
        private tipoModalService: TipoModalService,
        private authService: AuthService, 
        private estudianteService: EstudianteServices
    ) { }

    /**
     * METODO QUE RECIBE LA LISTA DE ESTUDIANTES
     * @param lista LISTA DE ESTUDIANTES DEL COMPONENTE PAGINACION
     */
    recibirEstudiantes = (lista: Estudiante[]): void => {
        this.estudiantes = lista;
    }
    
    /**
     * METODO PARA ELIMINARESTUDIANTE
     * @param id ID DEL ESTUDIANTE
     * @returns { Promise<any> } PROMESA CON VALOR DESCONOCIDO
     */
    eliminarEstudiante = async (id: number): Promise<any> => {
        try {

            if(await this.authService.validarSesion() === false) {
                this.tipoModalService.tokenExpirado();
                return;
            }

            const res = await this.estudianteService.eliminar(id);

            this.tipoModalService.elementoEliminado('Estudiante eliminado exitosamente');

            const estudiantesActualizados = await this.estudianteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            this.estudiantes = estudiantesActualizados;
            
            return res;
            } catch (error) {
                this.tipoModalService.manejoError(error);
            }
    }

    /**
     * METODO PARA COPIAR LA CEDULA DEL ESTUDIANTE
     * @param cedula CEDULA DEL ESTUDIANTE
     */
    copiarCedula = (cedula: number) => {
        navigator.clipboard.writeText(JSON.stringify(cedula));
        this.titleCopiado = "Copiado";
        this.tipoModalService.cedulaCopiada();
    }

}
