import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGenero } from 'src/app/interfaces/IGenero';
import { Docente } from 'src/app/models/docente.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { GenerosServices } from 'src/app/services/generos/generos.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-editar-docente',
    imports: [],
    templateUrl: './editar-docente.component.html',
    styleUrl: './editar-docente.component.css'
})
export default class EditarDocenteComponent {

    nombreFormulario: string = 'Editando Docente';
    estudiante: Docente = new Docente;
    generos: IGenero[] = [];
    confirmacion_contrasena = '';
    
    constructor(
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute, 
        private docenteService: DocenteService, 
        private generosService: GenerosServices, 
        private authService: AuthService) { }


    ngOnInit(): void {
        this.mostrarDocente();
    }


    mostrarDocente = async () => {
        try{

            if(await this.authService.validarSesion() == false){
                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Token expirado, inicie sesión nuevamente.',
                    altImg: 'Imagen de informacion',
                    colorTexto: '#1A1731',
                    srcImg: 'informacion.webp',
                    listaErrores: [],
                    redireccionar: true
                })
                return;
            }


            const id = this.activatedRoute.snapshot.params['id'];
            if(id){
                this.estudiante = await this.docenteService.buscarPorId(id);
                this.traerGeneros();
            }
        }catch (error) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: `Error al cargar el estudiante: ${error}`,
                altImg: 'Imagen de error',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                listaErrores: [],
                redireccionar: false
            })
        }
    }


    traerGeneros = async () => {
        try {
            this.generos = await this.generosService.listarGeneros();
        } catch (error) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: `Error al cargar los generos: ${error}`,
                altImg: 'Imagen de error',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                listaErrores: [],
                redireccionar: false
            })
        }
    }


    actualizar = async (id: number) => {
        try {
            if(await this.authService.validarSesion() === false) {

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Token expirado, inicie sesión nuevamente.',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    colorTexto: '#1A1731',
                    listaErrores: [],
                    redireccionar: true
                })
                return;
            }

            const res = await this.docenteService.actualizar(id, this.estudiante);
            
            if(res == null){

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Docente actualizado (verificar en la tabla).',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    colorTexto: '#1A1731',
                    listaErrores: [],
                    redireccionar: false
                })
            }

        } catch (error) {

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error al actualizar',
                altImg: 'Imagen de error',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                listaErrores: [],
                redireccionar: false
            })
            return;
        }
    }


}
