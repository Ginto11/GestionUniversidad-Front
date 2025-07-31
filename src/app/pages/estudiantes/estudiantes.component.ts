import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-estudiantes',
    imports: [HeaderSesionComponent, RouterOutlet, RouterLinkActive, RouterLink, FooterSesionComponent],
    templateUrl: './estudiantes.component.html',
    styleUrl: './estudiantes.component.css'
})
export default class EstudiantesComponent implements OnInit {



    constructor(
        private modalService: ModalService,
        private authService: AuthService, 
        private router: Router, 
        private estudianteService: EstudianteServices, 
        private viewportScroller: ViewportScroller) {}

    ngOnInit(): void {
        this.validarSesion();
    }

    
    validarSesion = async (): Promise<any> => {
        if(await this.authService.validarSesion() == false) {

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Inicie sesión para poder continuar.',
                altImg: 'Imagen de informacion',
                colorTexto: '#1A1731',
                srcImg: 'informacion.webp',
                listaErrores: [],
                redireccionar: false
            })
            return;
        }
        this.viewportScroller.scrollToPosition([0, 0]);
    }


}
