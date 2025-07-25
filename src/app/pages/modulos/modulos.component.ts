import { Component, OnInit } from '@angular/core';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { AuthService } from '../../services/auth/auth.service';
import { RecursoComponent } from '../../shared/recurso/recurso.component';
import { desencriptar } from 'src/app/util/util.encrypt';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';

@Component({
    selector: 'app-modulos',
    imports: [HeaderSesionComponent, RecursoComponent, FooterSesionComponent],
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css'
})
export default class ModulosComponent implements OnInit {

    rolUser!: string;

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

        } catch (error) {
            console.log(error);
        }
    }

}
