import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { desencriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { OverlayComponent } from '../overlay/overlay.component';
import { EstudiantesServices } from 'src/app/services/estudiantes/estudiantes.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
    selector: 'app-tabla-estudiantes',
    imports: [OverlayComponent],
    templateUrl: './tabla-estudiantes.component.html',
    styleUrl: './tabla-estudiantes.component.css'
})
export class TablaEstudiantesComponent implements OnInit {
    @Input() estudiantes: any;
    @Input() eliminarEstudianteInput!: () => Promise<any>;

    activarOverlay = false;
    estudianteEliminado = false;

    constructor(private authService: AuthService, private estudiantesService: EstudiantesServices, private comunicacionService: ComunicacionService) { }

    ngOnInit(): void {
        this.validarSesion();
    }


    validarSesion = () => {
        let data = buscarEnSesionStorage('user');
        if (data) {
            let tokenDesencriptado = desencriptar(data.token);
            this.authService.verificarToken(tokenDesencriptado).subscribe({
                error: (error) => {
                    if (error.status === 401) {
                        this.activarOverlay = true;
                        console.log('Token inválido (401)');
                    }
                }
            });
        }
    };

    async eliminarEstudiante (id: number): Promise<any> {
        try {
            let res = await this.estudiantesService.eliminar(id);
            this.estudianteEliminado = true;
            
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    recibirDeOverlay = (valor: boolean): void => {
        this.estudianteEliminado = valor;

        if(this.estudianteEliminado){
            this.estudianteEliminado = false;
            window.location.reload();
        }
    }

}
