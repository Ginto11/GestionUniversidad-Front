import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { ActivatedRoute } from '@angular/router';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { FormsModule } from '@angular/forms';
import { IGenero } from 'src/app/interfaces/IGenero';
import { GenerosServices } from 'src/app/services/generos/generos.service';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-editar-estudiante',
    imports: [FormsModule, RouterLink],
    templateUrl: './editar-estudiante.component.html',
    styleUrl: './editar-estudiante.component.css'
})
export default class EditarEstudianteComponent implements OnInit {

    nombreFormulario: string = 'Editando Estudiante';
    estudiante: Estudiante = new Estudiante;
    generos: IGenero[] = [];
    confirmacion_contrasena = '';
    
    /**
     * CREA UNA INSTANCIA DEL COMPONENTE
     * @param activatedRoute SERVICIO PARA ACCEDER AL PARAMS(ID) DE LA URL
     * @param estudianteService SERVICIO PARA OPERACIONES RELACIONADAS CON ESTUDIANTES
     * @param generosService SERVICIO PARA TRAER LOS GENEROS DE LOS ESTUDIANTES
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param authService SERVICIO DE AUTENTIICACION DEL USUARIO
     */
    constructor(
        private activatedRoute: ActivatedRoute, 
        private estudianteService: EstudianteServices, 
        private generosService: GenerosServices, 
        private tipoModalService: TipoModalService,
        private authService: AuthService) { }


    ngOnInit(): void {
        this.mostrarEstudiante();
    }

    /**
     * METODO QUE MUESTRA EL ESTUDIANTE POR EDITAR
     */
    mostrarEstudiante = async () => {
        try{

            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return;
            }

            const id = this.activatedRoute.snapshot.params['id'];

            if(id){
                this.estudiante = await this.estudianteService.buscarPorId(id);
                this.traerGeneros();
            }
        }catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * METODO QUE TRAE LOS GENEROS
     */
    traerGeneros = async () => {
        try {
            this.generos = await this.generosService.listarGeneros();
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * METODO QUE ACTUALIZA UN ESTUDIANTE
     * @param id ID DEL ESTUDIANTE
     */
    actualizar = async (id: number) => {
        try {
            if(await this.authService.validarSesion() === false) {
                this.tipoModalService.tokenExpirado();
                return;
            }

            const res = await this.estudianteService.actualizar(id, this.estudiante);
            
            if(res == null){
                this.tipoModalService.elementoActualizado('Estudiante actualizado (verificar en la tabla).');
            }

        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }


    
}