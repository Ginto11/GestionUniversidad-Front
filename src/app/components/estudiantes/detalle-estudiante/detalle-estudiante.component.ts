import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-detalle-estudiante',
    imports: [FormsModule, CommonModule],
    templateUrl: './detalle-estudiante.component.html',
    styleUrl: './detalle-estudiante.component.css'
})

export default class DetalleEstudianteComponent implements OnInit {
    estudiante: Estudiante = new Estudiante();

    cedula = null;

    /**
     * CREA UNA INSTANCIA DEL COMPONENTE
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param estudianteService SERVICIO PARA OPERACIONES CON ESTUDIANTES
     */
    constructor(
        private authService: AuthService,
        private tipoModalService: TipoModalService,
        private estudianteService: EstudianteServices){}

    ngOnInit(): void {
        this.validarToken();
    }

    /**
     * METODO QUEE VALIDA EL TOKEN JWT
     * @returns { Promise<any> } PROMESA CON VALOR DESCONOCIDO
     */
    validarToken = async () :Promise<any> => {
        if(await this.authService.validarSesion() == false){
            this.tipoModalService.tokenExpirado();
            return;
        }
    }

    /**
     * METODO QUE BUSCA UN ESTUDIANTE POR CEDULA
     */
    buscarEstudiante = async () => {
        if(!this.cedula){
            this.tipoModalService.pedirDato('Ingrese el numero de cedula, por favor.');
            return;
        }

        this.estudiante = await this.estudianteService.buscarPorCedula(this.cedula);
    }
}
