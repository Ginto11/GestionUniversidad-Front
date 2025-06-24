import { Component, Input } from '@angular/core';
import { IEstudianteRegistrar } from 'src/app/interfaces/IEstudianteRegistrar';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { OverlayComponent } from '../../../shared/overlay/overlay.component';
import { IOpcionesOverlay } from 'src/app/interfaces/IOpcionesOverlay';
import { IAccionesOverlay } from 'src/app/interfaces/IAccionesOverlay';

@Component({
    selector: 'app-nuevo-estudiante',
    imports: [FormsModule, OverlayComponent],
    templateUrl: './nuevo-estudiante.component.html',
    styleUrl: './nuevo-estudiante.component.css'
})
export default class NuevoEstudianteComponent {

    nombreFormulario: string = 'Registro de Estudiante';

    opciones: IOpcionesOverlay =  {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista: []
    };

    accionesOverlay: IAccionesOverlay = {
        redireccionar: false,
        ocultar: false
    };

    estudiante: IEstudianteRegistrar = {
        cedula: null,
        nombre: '',
        apellido: '',
        edad: null,
        email: '',
        contrasena: '',
        generoId: 0
    }

    activarOverlay = false;
    estaCreado = false;
    listaErrores: string[] = [];


    constructor(private estudianteServices: EstudianteServices, private comunicacionService: ComunicacionService){}


    crearEstudiante = async () => {
        try {
            this.listaErrores = this.validarRegistroEstudiante(this.estudiante);

            if(this.listaErrores.length == 0){
                await this.estudianteServices.crear(this.estudiante);
                this.ocultarOverlay('Estudiante registrado exitosamente', '/icons/comprobado.png', 'green', 'IconComprobado', []);
                this.limpiarCampos();
                this.activarOverlay = true;
                return;
            }

            this.ocultarOverlay('Error al registrar estudiante', '/icons/error.png', 'red', 'IconError', this.listaErrores);
            this.activarOverlay = true;

        } catch (error) {
            this.ocultarOverlay('Ocurrio un error inesperado.', '/icons/error.png', 'red', 'IconError', []);
            this.activarOverlay = true;
        }
    }

    recibirDatoOcultar = (dato: boolean) => {
        if(dato){
            this.activarOverlay = false;
        }
    }

    validarRegistroEstudiante = (est: IEstudianteRegistrar): string[] => {
        const errores: string[] = [];

        if (!est.cedula || est.cedula.toString().length < 5) errores.push('La cédula debe ser mayor a 4 dígitos.');
        if (!est.nombre.trim()) errores.push('El nombre es obligatorio.');
        if (!est.apellido.trim()) errores.push('El apellido es obligatorio.');
        if (!est.edad || est.edad < 18 || est.edad > 100) errores.push('Edad fuera de rango (18-100).');
        if (!est.email.includes('@') || !est.email.includes('.')) errores.push('Correo no válido.');
        if (est.contrasena.length < 6) {
            errores.push('Contraseña inválida (mín. 6 caracteres).');
        }

        if (est.generoId <= 0) errores.push('Seleccione un género válido.');

        return errores;
    };


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

    limpiarCampos = () => {
        this.estudiante.apellido = '';
        this.estudiante.cedula = null;
        this.estudiante.contrasena = '';
        this.estudiante.edad = null;
        this.estudiante.generoId = 0;
        this.estudiante.email = '';
        this.estudiante.nombre = '';
    };

}
