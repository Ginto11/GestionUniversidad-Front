import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayComponent } from "src/app/shared/overlay/overlay.component";

@Component({
    selector: 'app-estudiantes',
    imports: [HeaderSesionComponent, RouterOutlet, RouterLinkActive, RouterLink, FooterSesionComponent, OverlayComponent],
    templateUrl: './estudiantes.component.html',
    styleUrl: './estudiantes.component.css'
})
export default class EstudiantesComponent implements OnInit {

    accionesOverlay = {
            redireccionar: false,
            ocultar: false
        }
    
    activarOverlay = false;
    
    opciones: IOpcionesOverlay =  {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista: []
    }

    constructor(private authService: AuthService, private router: Router, private estudianteService: EstudianteServices, private viewportScroller: ViewportScroller) {}

    ngOnInit(): void {
        this.validarSesion();
    }

    
    validarSesion = async (): Promise<any> => {
        if(await this.authService.validarSesion() == false) {
            this.redireccionarOverlay('Inicie sesión para poder continuar.', 'informacion.webp', '#1A1731', 'Informacion', []);
            this.activarOverlay = true;
            return;
        }
        this.viewportScroller.scrollToPosition([0, 0]);
    }


    recibirDatoOcultar = (dato: boolean) => {
        if(dato){
            this.activarOverlay = false;
        }
    }

    ocultarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = false;
        this.accionesOverlay.ocultar = true;
    }

    redireccionarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = true;
        this.accionesOverlay.ocultar = false;
    }



}
