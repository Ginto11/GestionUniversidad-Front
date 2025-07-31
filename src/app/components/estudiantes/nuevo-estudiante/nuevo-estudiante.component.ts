import { Component, Input } from '@angular/core';
import { IEstudianteRegistrar } from 'src/app/interfaces/IEstudianteRegistrar';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { RedireccionService } from 'src/app/services/redireccion/redireccion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-nuevo-estudiante',
    imports: [FormsModule],
    templateUrl: './nuevo-estudiante.component.html',
    styleUrl: './nuevo-estudiante.component.css'
})
export default class NuevoEstudianteComponent {

    nombreFormulario: string = 'Registro de Estudiante';

    estudiante: IEstudianteRegistrar = {
        cedula: null,
        nombre: '',
        apellido: '',
        edad: null,
        celular: '',
        email: '',
        contrasena: '',
        confirmacion_contrasena: '',
        generoId: 0
    }

    estaCreado = false;
    listaErrores: string[] = [];


    constructor(
        private modalService: ModalService,
        private estudianteServices: EstudianteServices, 
        private redireccionService: RedireccionService){}


    crearEstudiante = async () => {
        try {
            this.listaErrores = this.validarRegistroEstudiante(this.estudiante);

            if(this.listaErrores.length == 0){
                await this.estudianteServices.crear(this.estudiante);

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Estudiante registrado exitosamente',
                    colorTexto: '#1A1731',
                    altImg: 'Imagen de comprobado',
                    srcImg: 'comprobado.webp',
                    listaErrores: [],
                    redireccionar: false
                })

                this.limpiarCampos();
                return;
            }

            if(this.estudiante.contrasena != this.estudiante.confirmacion_contrasena){
                
                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Las contraseñas no coinciden.',
                    colorTexto: 'Red',
                    altImg: 'Imagen de error',
                    srcImg: 'error.webp',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error al registrar estudiante',
                colorTexto: 'Red',
                altImg: 'Imagen de error',
                srcImg: 'error.webp',
                listaErrores: [],
                redireccionar: false
            })

        } catch (error) {
            if(error instanceof HttpErrorResponse){

                this.modalService.abrirModal(ModalComponent, {
                    mensaje: error.error.mensaje,
                    colorTexto: 'Red',
                    altImg: 'Imagen de error',
                    srcImg: 'error.webp',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Ocurrio un error inesperado.',
                colorTexto: 'Red',
                altImg: 'Imagen de error',
                srcImg: 'error.webp',
                listaErrores: [],
                redireccionar: false
            })
        }
    }

    validarRegistroEstudiante = (est: IEstudianteRegistrar): string[] => {
        const errores: string[] = [];

        if (est.contrasena !==  est.confirmacion_contrasena) errores.push('Las contraseñas no coinciden.');
        if (!est.cedula || est.cedula.toString().length < 5) errores.push('La cédula debe ser mayor a 4 dígitos.');
        if (!est.celular || est.celular.length < 7) errores.push("Numero de celular no valido.");
        if (!est.nombre.trim()) errores.push('El nombre es obligatorio.');
        if (!est.apellido.trim()) errores.push('El apellido es obligatorio.');
        if (!est.edad || est.edad < 18 || est.edad > 100) errores.push('Edad fuera de rango (18-100).');
        if (!est.email.includes('@') || !est.email.includes('.')) errores.push('Correo no válido.');
        if (est.contrasena.length < 6) {
            errores.push('Contraseña inválida (mín. 6 caracteres).');
        }

        if (est.generoId <= 0) errores.push('Seleccione un género válido.');

        return errores;
    };

    limpiarCampos = () => {
        this.estudiante.apellido = '';
        this.estudiante.cedula = null;
        this.estudiante.contrasena = '';
        this.estudiante.edad = null;
        this.estudiante.generoId = 0;
        this.estudiante.email = '';
        this.estudiante.nombre = '';
        this.estudiante.celular = '';
        this.estudiante.contrasena = '';
        this.estudiante.confirmacion_contrasena = '';
    };

}
