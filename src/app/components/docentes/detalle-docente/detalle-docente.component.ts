import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Docente } from 'src/app/models/docente.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-detalle-docente',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './detalle-docente.component.html',
    styleUrl: './detalle-docente.component.css'
})
export default class DetalleDocenteComponent {
    docente: Docente = new Docente();

    cedula = null;

    /**
     * CREA UNA INSTANCIA DEL COMPONENTE
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param docenteService SERVICIO PARA OPERACIONES CON DOCENTES
     */
    constructor(
        private authService: AuthService,
        private tipoModalService: TipoModalService,
        private docenteService: DocenteService) { }

    ngOnInit(): void {
        this.validarToken();
    }

    /**
     * METODO QUEE VALIDA EL TOKEN JWT
     * @returns { Promise<any> } PROMESA CON VALOR DESCONOCIDO
     */
    validarToken = async (): Promise<any> => {
        if (await this.authService.validarSesion() == false) {
            this.tipoModalService.tokenExpirado();
            return;
        }
    }

    /**
     * METODO QUE BUSCA UN DOCENTE POR CEDULA
     */
    buscarDocente = async () => {
        if (!this.cedula) {
            this.tipoModalService.pedirDato('Ingrese el numero de cedula, por favor.');
            return;
        }

        try {
            this.docente = await this.docenteService.buscarPorCedula(this.cedula);
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }
}
