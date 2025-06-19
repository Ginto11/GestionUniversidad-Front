import { Component, Input } from '@angular/core';
import { EstudianteRegistrar } from 'src/app/interfaces/EstudianteRegistrar';
import { estudianteRegistrar } from 'src/app/models/modelos';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
    selector: 'app-form-nuevos-usuarios',
    imports: [FormsModule, OverlayComponent],
    templateUrl: './form-nuevos-usuarios.component.html',
    styleUrl: './form-nuevos-usuarios.component.css'
})
export class FormNuevosUsuariosComponent {

    @Input() nombreFormulario: string = '';
    @Input() esEstudinate: boolean = false;
    @Input() esDocente: boolean = false;
    estudiante: EstudianteRegistrar = estudianteRegistrar;
    estaCreado = false;
    mostrarOverlayExitoso = false;
    mostrarOverlayErrores = false;
    listaErrores: string[] = [];


    constructor(private estudianteServices: EstudianteServices, private comunicacionService: ComunicacionService){}



    validarRegistro = () => {
        if(this.esEstudinate){
            this.crearEstudiante();
        };
    }

    crearEstudiante = async () => {
        try {
            this.listaErrores = this.validarRegistroEstudiante(this.estudiante);

            if(this.listaErrores.length == 0){
                await this.estudianteServices.crear(this.estudiante);
                this.mostrarOverlayExitoso = true;
                return;
            }

            this.mostrarOverlayErrores = true;

        } catch (error) {
            console.log(error);
        }
    }

    recibirDelOverlayExitoso = (valor: boolean) => {
        this.mostrarOverlayExitoso = !valor;
        this.comunicacionService.recargarPagina();
    }

    recibirDelOverlayErrores = (valor: boolean ) => {
        this.mostrarOverlayErrores = !valor;
    }

    validarRegistroEstudiante = (est: EstudianteRegistrar): string[] => {
        const errores: string[] = [];

        if (est.cedula.toString().length < 5) errores.push('La cédula debe ser mayor a 4 dígitos.');
        if (!est.nombre.trim()) errores.push('El nombre es obligatorio.');
        if (!est.apellido.trim()) errores.push('El apellido es obligatorio.');
        if (est.edad < 18 || est.edad > 100) errores.push('Edad fuera de rango (18-100).');
        if (!est.email.includes('@') || !est.email.includes('.')) errores.push('Correo no válido.');
        if (est.contrasena.length < 6) {
            errores.push('Contraseña inválida (mín. 6 caracteres).');
        }

        if (est.generoId <= 0) errores.push('Seleccione un género válido.');

        return errores;
    };

   
}
