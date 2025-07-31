import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/services/modal/modal.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-detalle-estudiante',
    imports: [FormsModule, CommonModule],
    templateUrl: './detalle-estudiante.component.html',
    styleUrl: './detalle-estudiante.component.css'
})

export default class DetalleEstudianteComponent implements OnInit {
    estudiante: Estudiante = new Estudiante();

    cedula = null;

    constructor(
        private authService: AuthService,
        private modalService: ModalService,
        private estudiantesService: EstudianteServices){}

    ngOnInit(): void {
        this.validarToken();
    }

    validarToken = async () :Promise<any> => {
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
    }

    buscarEstudiante = async () => {
        if(!this.cedula){
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Ingrese el numero de cedula, por favor.',
                altImg: 'Imagen de error',
                colorTexto: 'Red',
                srcImg: 'error.webp',
                listaErrores: [],
                redireccionar: false
            })
            return;
        }

        this.estudiante = await this.estudiantesService.buscarPorCedula(this.cedula);

    }
}
