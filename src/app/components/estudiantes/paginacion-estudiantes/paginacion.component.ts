import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent implements OnInit{

    @Input() numeroPagina!: number;
    @Input() tamanoPagina!: number;

    @Output() enviarEstudiantes = new EventEmitter<Estudiante[]>();

    constructor(
        private modalService: ModalService,
        private estudiantesService: EstudianteServices, 
        private authService: AuthService){ }

    ngOnInit(): void {
        this.init();
    }

    listarPaginacion = async (): Promise<Estudiante[]> => {
        try {
            if(await this.authService.validarSesion() == false) {

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Inicie sesión para poder continuar.',
                    colorTexto: '#1A1731',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    listaErrores: [],
                    redireccionar: false
                })
                return [];
            }

            const estudiantes = await this.estudiantesService.listarPaginado(this.numeroPagina, this.tamanoPagina);
            
            return estudiantes;

        } catch (error) {

            this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Error al cargar los estudiantes.',
                    colorTexto: 'Red',
                    altImg: 'Imagen de error',
                    srcImg: 'error.webp',
                    listaErrores: [],
                    redireccionar: false
                })
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

}
