import { Component, OnInit } from '@angular/core';
import { IEstudianteRegistrar } from 'src/app/interfaces/IEstudianteRegistrar';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';

@Component({
    selector: 'app-nuevo-estudiante',
    imports: [FormsModule],
    templateUrl: './nuevo-estudiante.component.html',
    styleUrl: './nuevo-estudiante.component.css'
})
export default class NuevoEstudianteComponent implements OnInit {

    nombreFormulario: string = 'Registro de Estudiante';

    estudiante: IEstudianteRegistrar = {
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
     * CREA UNA INSTANCIA DEL COMPONENTE
     * @param authService SERVICIO DE AUTENTIICACION DEL USUARIO
     * @param tipoModalService SERVICIO PARA MOSTRAR DIFERENTES TIPOS DE MODALES
     * @param estudianteServices SERVICIO PARA OPERACIONES RELACIONADAS CON ESTUDIANTES
     */
    constructor(
        private authService: AuthService,
        private tipoModalService: TipoModalService,
        private estudianteServices: EstudianteServices
    ){}

    ngOnInit(): void {
        this.validarToken();
    }

    /**
     * METODO QUE VALIDA EL TOKEN JWT
     * @returns { Promise<any> } PROMESA CON VALOR DESCONOCIDO
     */
    validarToken = async () :Promise<any> => {
        if(await this.authService.validarSesion() == false){
            this.tipoModalService.tokenExpirado();
            return;      
        }
    }

    /**
     * METODO QUE CREA UN ESTUDIANTE
     */
    crearEstudiante = async () => {
        try {

            if(await this.authService.validarSesion() == false){
                this.tipoModalService.tokenExpirado();
                return;
            }

            this.listaErrores = this.validarRegistroEstudiante(this.estudiante);

            if(this.listaErrores.length > 0){
                this.tipoModalService.mostrarMultiplesErrores(this.listaErrores);
                return;
            }

            if(this.listaErrores.length == 0){
                await this.estudianteServices.crear(this.estudiante);

                this.tipoModalService.elementoAgregado('Estudiante registrado exitosamente');
                this.limpiarCampos();
                return;
            }

            if(this.estudiante.contrasena != this.estudiante.confirmacion_contrasena){
                this.tipoModalService.contrasenasDesiguales();
                return;
            }

        } catch (error) {
            this.tipoModalService.manejoError(error);

        }
    }

    /**
     * METODO QUE VALIDA LOS CAMPOS AL REGISTRAR UN ESTUDIANTE
     * @param est INTERFACE PARA REGISTRAR ESTUDIANTES
     * @returns { string[] } LISTA DE ERRORES
     */
    validarRegistroEstudiante = (est: IEstudianteRegistrar): string[] => {
        const errores: string[] = [];

        if (est.contrasena !==  est.confirmacion_contrasena) errores.push('Las contraseñas no coinciden.');
        if (!est.cedula || est.cedula.toString().length < 5) errores.push('La cédula debe ser mayor a 4 dígitos.');
        if (!est.celular || est.celular.length < 7) errores.push("Numero de celular no valido.");
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

    limpiarCampos = () => {
        this.estudiante.apellido = '';
        this.estudiante.cedula = null;
        this.estudiante.contrasena = '';
        this.estudiante.edad = null;
        this.estudiante.generoId = 0;
        this.estudiante.email = '';
        this.estudiante.nombre = '';
        this.estudiante.celular = '';
        this.estudiante.contrasena = '';
        this.estudiante.confirmacion_contrasena = '';
    };

}
