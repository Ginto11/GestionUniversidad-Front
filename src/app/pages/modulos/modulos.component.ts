import { Component, OnInit } from '@angular/core';
import { NavSesionComponent } from "../../shared/nav-sesion/nav-sesion.component";
import { AuthService } from '../../services/auth/auth.service';
import { RecursoComponent } from '../../shared/recurso/recurso.component';
import { desencriptar } from 'src/app/util/util.encrypt';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';

@Component({
    selector: 'app-modulos',
    imports: [NavSesionComponent, RecursoComponent],
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css'
})
export default class ModulosComponent implements OnInit {

    nombreUser = JSON.parse(sessionStorage.getItem('usuario') || '{}').nombre;
    rolUser = "";
    isInicio = false;


    constructor(private authService: AuthService, private comunicacionService: ComunicacionService) { }

    ngOnInit(): void {
        this.validarInicioSesion();
    }

    validarInicioSesion = async () => {

        try {
            
            const usuario = buscarEnSesionStorage('usuario');

            if (!usuario) {
                this.comunicacionService.tokenExpirado();
                return;
            }

            const tokenDesencriptado = desencriptar(usuario.token);

            const res = await this.authService.decodificarToken(tokenDesencriptado);
            this.rolUser = res.rol;
            this.enviarCambioDeNav();

        } catch (error) {
            console.log(error);
        }
    }

    enviarCambioDeNav = () => {
        this.comunicacionService.ocultarLinksEnModulos(this.isInicio);
    }
}
