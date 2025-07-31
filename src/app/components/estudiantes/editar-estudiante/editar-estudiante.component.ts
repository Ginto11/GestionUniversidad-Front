import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { FormsModule } from '@angular/forms';
import { IGenero } from 'src/app/interfaces/IGenero';
import { GenerosServices } from 'src/app/services/generos/generos.service';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-editar-estudiante',
    imports: [FormsModule, RouterLink],
    templateUrl: './editar-estudiante.component.html',
    styleUrl: './editar-estudiante.component.css'
})
export default class EditarEstudianteComponent implements OnInit {

    nombreFormulario: string = 'Editando Estudiante';
    estudiante: Estudiante = new Estudiante;
    generos: IGenero[] = [];
    confirmacion_contrasena = '';
    
    constructor(
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute, 
        private estudiantesService: EstudianteServices, 
        private generosService: GenerosServices, 
        private authService: AuthService,
        private router: Router) { }


    ngOnInit(): void {
        this.mostrarEstudiante();
    }


    mostrarEstudiante = async () => {
        try{
            const id = this.activatedRoute.snapshot.params['id'];
            if(id){
                this.estudiante = await this.estudiantesService.buscarPorId(id);
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
                    mensaje: 'Inicie sesión para poder continuar.',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    colorTexto: '#1A1731',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }

            const res = await this.estudiantesService.actualizar(id, this.estudiante);
            
            if(res == null){

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Estudiante actualizado (verificar en la tabla).',
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