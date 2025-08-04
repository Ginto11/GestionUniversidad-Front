import { Component, OnInit } from '@angular/core';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-inicio-estudiantes',
    imports: [HeaderSesionComponent, RouterOutlet, RouterLinkActive, RouterLink, FooterSesionComponent],
    templateUrl: './inicio-estudiantes.component.html',
    styleUrl: './inicio-estudiantes.component.css'
})
export default class InicioEstudiantesComponent implements OnInit {



    constructor(
        private modalService: ModalService,
        private authService: AuthService, 
        private viewportScroller: ViewportScroller) {}

    ngOnInit(): void {
        this.validarSesion();
    }

    
    validarSesion = async (): Promise<any> => {
        if(await this.authService.validarSesion() == false) {

            /*this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Token expirado, inicie sesión nuevamente.',
                altImg: 'Imagen de informacion',
                colorTexto: '#1A1731',
                srcImg: 'informacion.webp',
                listaErrores: [],
                redireccionar: true
            })
            return;*/
        }
        this.viewportScroller.scrollToPosition([0, 0]);
    }


}
