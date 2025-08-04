import { Component, OnInit } from '@angular/core';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { AuthService } from '../../services/auth/auth.service';
import { RecursoComponent } from '../../shared/recurso/recurso.component';
import { desencriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-modulos',
    imports: [HeaderSesionComponent, RecursoComponent, FooterSesionComponent],
    templateUrl: './modulos.component.html',
    styleUrl: './modulos.component.css'
})
export default class ModulosComponent implements OnInit {

    rolUser!: string;

    constructor(
        private authService: AuthService, 
        private tipoModalService: TipoModalService
    ) { }

    ngOnInit(): void {
        this.validarInicioSesion();
    }

    validarInicioSesion = async () => {

        try {
            
            const usuario = buscarEnSesionStorage('usuario');

            if (!usuario) {
                this.tipoModalService.manejoErrorGenericoConRedireccion('Debes iniciar sesión para acceder a esta sección.');
                return;
            }


            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return;
            }

            const tokenDesencriptado = desencriptar(usuario.token);

            const res = await this.authService.decodificarToken(tokenDesencriptado);
            this.rolUser = res.rol;

        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

}
