import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({providedIn: 'root'})
export class TipoModalService {
    constructor(
        private modalService: ModalService,
    ) { }

    tokenExpirado = () :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: 'Token expirado, inicie sesión nuevamente.',
            colorTexto: '#1A1731',
            srcImg: 'informacion.webp',
            altImg: 'Imagen de informacion',
            listaErrores: [],
            redireccionar: true
        })
    }

    elementoAgregado = (mensaje: string) :void =>{
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: '#1A1731',
            altImg: 'Imagen de comprobado',
            srcImg: 'comprobado.webp',
            listaErrores: [],
            redireccionar: false
        })
    } 

    elementoEliminado = (mensaje: string):void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: '#1A1731',
            srcImg: 'comprobado.webp',
            altImg: 'Imagen de comprobado',
            listaErrores: [],
            redireccionar: false
        })
    }

    elementoActualizado =  (mensaje: string) :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            altImg: 'Imagen de informacion',
            srcImg: 'informacion.webp',
            colorTexto: '#1A1731',
            listaErrores: [],
            redireccionar: false
        })
    }

    errorAlMostrarUnElemento = (mensaje: string) :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            colorTexto: 'Red',
            listaErrores: [],
            redireccionar: false
        })
    }

    pedirDato = (mensaje: string) :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            altImg: 'Imagen de error',
            colorTexto: 'Red',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    contrasenasDesiguales = () :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: 'Las contraseñas no coinciden.',
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    cedulaCopiada = () :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: 'Cedula Copiada.',
            altImg: 'Imagen de comprobado',
            colorTexto: 'Green',
            srcImg: 'comprobado.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    ultimaPagina = () :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: 'No hay mas datos por mostrar.',
            colorTexto: '#1A1731',
            altImg: 'Imagen de informacion',
            srcImg: 'informacion.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    errorAlEliminar = (mensaje: string) :void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    mostrarMultiplesErrores = (errores: string[]):void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: '',
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: errores,
            redireccionar: false
        })
    }


    manejoError = (error: any) :void => {
        if(error.status >= 400 && error.status < 500){
            this.crearModalError(`Error en el cliente (Codigo: ${error.status} ${error.statusText})`);
            return;
        }

        if(error.status >= 500){
            this.crearModalError(`Error en el servidor (Codigo: ${error.status} ${error.statusText})`);
            return;
        }
        console.log(error);
        this.crearModalError(`Error inesperado (Codigo: ${error.status} ${error.statusText})`);
    }

    manejoErrorGenerico = (mensaje: string): void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    manejoErrorGenericoConRedireccion = (mensaje: string): void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: true
        })
    }

    manejoExitoso = (mensaje: string): void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: 'Green',
            altImg: 'Imagen de exito',
            srcImg: 'comprobado.webp',
            listaErrores: [],
            redireccionar: false
        })
    }

    private crearModalError = (mensaje: string): void => {
        this.modalService.abrirModal(ModalComponent, {
            mensaje: mensaje,
            colorTexto: 'Red',
            altImg: 'Imagen de error',
            srcImg: 'error.webp',
            listaErrores: [],
            redireccionar: false
        })
    }
    
}