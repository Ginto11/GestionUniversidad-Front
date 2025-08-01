import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IDocenteRegistrar } from 'src/app/interfaces/IDocenteRegistrar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocenteService } from 'src/app/services/docentes/docente.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-nuevo-docente',
    imports: [FormsModule],
    templateUrl: './nuevo-docente.component.html',
    styleUrl: './nuevo-docente.component.css'
})
export default class NuevoDocenteComponent {
    nombreFormulario: string = 'Registro de Docente';

    docente: IDocenteRegistrar = {
        cedula: null,
        nombre: '',
        apellido: '',
        edad: null,
        celular: '',
        email: '',
        contrasena: '',
        confirmacion_contrasena: '',
        generoId: 0
    }

    estaCreado = false;
    listaErrores: string[] = [];

    /**
     * 
     * @param authService SERVICIO DE AUTENTICACION DEL USUARIO
     * @param docenteServices SERVICIO PARA OPERACIONES RELACIONADAS CON DOCENTES
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     */
    constructor(
        private authService: AuthService,
        private docenteServices: DocenteService, 
        private tipoModalService: TipoModalService
    ){}

    ngOnInit(): void {
        this.validarToken();
    }

    /**
     * METODO QUE VALIDA EL TOKEN JWT
     * @returns { Promise<any> } UNA PROMESA CON UN VALOR DESCONOCIDO
     */
    validarToken = async () :Promise<any> => {
        if(await this.authService.validarSesion() == false){
            this.tipoModalService.tokenExpirado();
            return;      
        }
    }

    /**
     * METODO QUE ME CREA UN DOCENTE
     */
    crearDocente = async () => {
        try {

            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return;
            }

            this.listaErrores = this.validarRegistroDocente(this.docente);

            if(this.listaErrores.length > 0){
                this.tipoModalService.mostrarMultiplesErrores(this.listaErrores);
                return;
            }

            if(this.listaErrores.length == 0){
                
                await this.docenteServices.crear(this.docente);

                this.tipoModalService.elementoAgregado('Docente registrado exitosamente');

                this.limpiarCampos();
                return;
            }

            if(this.docente.contrasena != this.docente.confirmacion_contrasena){
                this.tipoModalService.contrasenasDesiguales();
                return;
            }
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
    }

    /**
     * METODO QUE VALIDA CADA UNO DE LOS CAMPOS PARA REGISTRAR UN DOCENTE
     * @param doc INTERFACE PARA REGISTRAR UN DOCENTE
     * @returns { string[] } LISTA DE ERRORES
     */
    validarRegistroDocente = (doc: IDocenteRegistrar): string[] => {
        const errores: string[] = [];

        if (doc.contrasena !==  doc.confirmacion_contrasena) errores.push('Las contraseñas no coinciden.');
        if (!doc.cedula || doc.cedula.toString().length < 5) errores.push('La cédula debe ser mayor a 4 dígitos.');
        if (!doc.celular || doc.celular.length < 7) errores.push("Numero de celular no valido.");
        if (!doc.nombre.trim()) errores.push('El nombre es obligatorio.');
        if (!doc.apellido.trim()) errores.push('El apellido es obligatorio.');
        if (!doc.edad || doc.edad < 18 || doc.edad > 100) errores.push('Edad fuera de rango (18-100).');
        if (!doc.email.includes('@') || !doc.email.includes('.')) errores.push('Correo no válido.');
        if (doc.contrasena.length < 6) {
            errores.push('Contraseña inválida (mín. 6 caracteres).');
        }

        if (doc.generoId <= 0) errores.push('Seleccione un género válido.');

        return errores;
    };

    limpiarCampos = () => {
        this.docente.apellido = '';
        this.docente.cedula = null;
        this.docente.contrasena = '';
        this.docente.edad = null;
        this.docente.generoId = 0;
        this.docente.email = '';
        this.docente.nombre = '';
        this.docente.celular = '';
        this.docente.contrasena = '';
        this.docente.confirmacion_contrasena = '';
    };

}
