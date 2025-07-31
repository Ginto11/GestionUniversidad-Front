import { Component, OnInit } from '@angular/core';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { AuthService } from '../../services/auth/auth.service';
import { RecursoComponent } from '../../shared/recurso/recurso.component';
import { desencriptar } from 'src/app/util/util.encrypt';
import { RedireccionService } from 'src/app/services/redireccion/redireccion.service';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-modulos',
    imports: [HeaderSesionComponent, RecursoComponent, FooterSesionComponent],
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css'
})
export default class ModulosComponent implements OnInit {

    rolUser!: string;

    constructor(
        private modalService: ModalService,
        private authService: AuthService, 
        private redireccionService: RedireccionService) { }

    ngOnInit(): void {
        this.validarInicioSesion();
    }

    validarInicioSesion = async () => {

        try {
            
            const usuario = buscarEnSesionStorage('usuario');

            if (!usuario) {
                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Inicia sesión por favor...',
                    colorTexto: '#1A1731',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }


            if(await this.authService.validarSesion() == false){
                this.modalService.abrirModal(ModalComponent, {
                    mensaje: 'Inicia sesión nuevamente por favor...',
                    colorTexto: '#1A1731',
                    altImg: 'Imagen de informacion',
                    srcImg: 'informacion.webp',
                    listaErrores: [],
                    redireccionar: true
                })
            }

            const tokenDesencriptado = desencriptar(usuario.token);

            const res = await this.authService.decodificarToken(tokenDesencriptado);
            this.rolUser = res.rol;

        } catch (error) {
            throw error;
        }
    }

}
