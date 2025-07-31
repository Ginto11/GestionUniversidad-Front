import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { RedireccionService } from 'src/app/services/redireccion/redireccion.service';
import { RouterLink } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante.model';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from 'src/app/components/estudiantes/paginacion-estudiantes/paginacion.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

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
        private modalService: ModalService,
        private authService: AuthService, 
        private estudianteService: EstudianteServices, 
        private redireccionService: RedireccionService) { }

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

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Inicie sesión para poder continuar.',
                    colorTexto: '#1A1731',
                    srcImg: 'informacion.webp',
                    altImg: 'Imagen de informacion',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }

            const res = await this.estudianteService.eliminar(id);

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Estudiante eliminado exitosamente',
                colorTexto: '#1A1731',
                srcImg: 'comprobado.webp',
                altImg: 'Imagen de comprobado',
                listaErrores: [],
                redireccionar: false
            })

            const estudiantesActualizados = await this.estudianteService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            this.estudiantes = estudiantesActualizados;
            
            return res;
            } catch (error) {

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Error al eliminar el estudiante (verifique y si el estudiante tiene matricula no se puede eliminar)',
                    colorTexto: 'Red',
                    altImg: 'Imagen de error',
                    srcImg: 'error.webp',
                    listaErrores: [],
                    redireccionar: false
                })
            }
    }

    copiarCedula = (cedula: number) => {
        navigator.clipboard.writeText(JSON.stringify(cedula));
        this.titleCopiado = "Copiado";
    }

}
