import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProgramaRegistrar } from 'src/app/interfaces/IProgramaRegistrar';
import { Facultad } from 'src/app/models/facultad.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FacultadService } from 'src/app/services/facultades/facultad.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { ProgramaService } from 'src/app/services/programas/programas.service';

@Component({
    selector: 'app-nuevo-programa',
    imports: [FormsModule],
    templateUrl: './nuevo-programa.component.html',
    styleUrl: './nuevo-programa.component.css'
})
export default class NuevoProgramaComponent implements OnInit {
    nombreFormulario = 'Registrando Programa'
    imagenVisual: string = '';
    isCargando: boolean = false;
    facultades: Facultad[] = [];

    programa: IProgramaRegistrar = {
        nombre: '',
        descripcion: '',
        duracion: null,
        facultadId: '',
        archivo: null
    }

    constructor(
        private facultadService: FacultadService,
        private programaService: ProgramaService,
        private tipoModalService: TipoModalService,
        private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        this.traerFacultades();
    }

    crearPrograma = async () => {
        try {
            if (!this.programa.nombre || !this.programa.descripcion || !this.programa.duracion || !this.programa.facultadId || !this.programa.archivo) {
                this.tipoModalService.manejoErrorGenerico('Todos los campos son obligatorios');
                return;
            }

            this.isCargando = true;


            const formData = new FormData();
            formData.append('nombre', this.programa.nombre);
            formData.append('descripcion', this.programa.descripcion);
            formData.append('duracion', this.programa.duracion?.toString());
            formData.append('facultadId', this.programa.facultadId?.toString());
            formData.append('imagen', this.programa.archivo);

            await this.programaService.crear(formData);
            this.limpiarFormulario();
            this.isCargando = false;
            this.tipoModalService.elementoAgregado('Programa registrado exitosamente');
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    traerFacultades = async () => {
        try {
            if(await this.authService.validarSesion() == false) {
                this.tipoModalService.tokenExpirado();
                return;
            }

            this.facultades = await this.facultadService.traerFacultades();
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    alSeleccionarAchivo(event: Event): void {
        const input = event.target as HTMLInputElement;
        const archivo = input.files?.[0];

        if (archivo) {
            
            const reader = new FileReader();
            reader.onload = () => {
                const imagenUrl = reader.result as string;
                this.imagenVisual = imagenUrl;
            };
            reader.readAsDataURL(archivo);

            this.programa.archivo = archivo;
        }
    }

    limpiarFormulario = () => {
        this.programa = {
            nombre: '',
            descripcion: '',
            duracion: null,
            facultadId: '',
            archivo: null
        };
        this.imagenVisual = '';
    }

}
