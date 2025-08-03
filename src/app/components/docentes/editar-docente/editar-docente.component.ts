import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IGenero } from 'src/app/interfaces/IGenero';
import { Docente } from 'src/app/models/docente.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { GenerosServices } from 'src/app/services/generos/generos.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-editar-docente',
    imports: [FormsModule],
    templateUrl: './editar-docente.component.html',
    styleUrl: './editar-docente.component.css'
})
export default class EditarDocenteComponent {

    nombreFormulario: string = 'Editando Docente';
    docente: Docente = new Docente;
    generos: IGenero[] = [];
    confirmacion_contrasena = '';
    
    constructor(
        private tipoModalService: TipoModalService,
        private activatedRoute: ActivatedRoute, 
        private docenteService: DocenteService, 
        private generosService: GenerosServices, 
        private authService: AuthService) { }


    ngOnInit(): void {
        this.mostrarDocente();
    }

    /**
     * METODO QUE MUESTRA LA INFORMACION DEL DOCENTE
     */
    mostrarDocente = async () => {
        try{

            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return;
            }


            const id = this.activatedRoute.snapshot.params['id'];
            if(id){
                this.docente = await this.docenteService.buscarPorId(id);
                this.traerGeneros();
            }
        }catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * METODO QUE TRAE LOS GENEROS DE LOS DOCENTES
     */
    traerGeneros = async () => {
        try {
            this.generos = await this.generosService.listarGeneros();
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * METODO QUE ACTUALIZA EL DOCENTE
     * @param id ID DEL DOCENTE
     */
    actualizar = async (id: number) => {
        try {
            if(await this.authService.validarSesion() === false) {
                this.tipoModalService.tokenExpirado();
                return;
            }

            const res = await this.docenteService.actualizar(id, this.docente);
            
            if(res == null){
                this.tipoModalService.elementoActualizado('Docente actualizado (verificar en la tabla).');
            }

        } catch (error) {
            this.tipoModalService.manejoError(error);
            return;
        }
    }


}
