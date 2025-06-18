import { Component, OnInit } from '@angular/core';
import { NavSesionComponent } from "../../components/nav-sesion/nav-sesion.component";
import { AuthService } from '../../services/auth/auth.service';
import { RecursoComponent } from '../../components/recurso/recurso.component';
import { desencriptar } from 'src/app/util/util.encrypt';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';

@Component({
    selector: 'app-modulos',
    imports: [NavSesionComponent, RecursoComponent],
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css'
})
export class ModulosComponent implements OnInit {

    nombreUser = JSON.parse(sessionStorage.getItem('user') || '{}').nombre;
    rolUser = "";
    isInicio = false;


    constructor(private authService: AuthService, private comunicacionService: ComunicacionService) { }

    ngOnInit(): void {
        this.validarInicioSesion();
    }

    validarInicioSesion = () => {

        let usuario = buscarEnSesionStorage('user');
        let tokenDesencriptado = desencriptar(usuario.token);
        this.authService.decodificarToken(tokenDesencriptado).subscribe({
            next: (res) => {
                this.rolUser = res.rol;
                this.enviarCambioDeNav();
            }, error: (error) => {
                console.log(error);
            }
        });
    }

    enviarCambioDeNav = () => {
        this.comunicacionService.ocultarLinksEnModulos(this.isInicio);
    }
}
