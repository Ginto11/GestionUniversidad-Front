import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormIngresarComponent } from "../../shared/form-ingresar/form-ingresar.component";
import { IEstudianteRegistrar } from 'src/app/interfaces/IEstudianteRegistrar';
import { FormRegistrarComponent } from '../../shared/form-registrar/form-registrar.component';
import { OverlayComponent } from "../../shared/overlay/overlay.component";
import { desencriptar, encriptar } from 'src/app/util/util.encrypt';
import { buscarEnSesionStorage } from 'src/app/util/utilidad';
import { IAccionesOverlay } from 'src/app/interfaces/IAccionesOverlay';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
    selector: 'app-login',
    imports: [FormsModule, FormIngresarComponent, FormRegistrarComponent, OverlayComponent, FooterComponent],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export default class LoginComponent {

    constructor(public authService: AuthService, private router: Router) { }

    datosLogin = {
        email: '',
        contrasena: ''
    };
    
    datosRegistro = {
        cedula: null,
        nombre: '',
        apellido: '',
        edad: null,
        celular: '',
        email: '',
        contrasena: '',
        confirmacion_contrasena: '',
        generoId: 0
    };
    
    opciones = {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista:  [] as string[]
    };

    isIngresando = true;
    isRegistrando = false;
    mostrarOverlay = false;

    accionesOverlay: IAccionesOverlay = {
        redireccionar: false,
        ocultar: false
    }


    recibirDelOverlay = (ocultar: boolean) => {
        this.mostrarOverlay = !ocultar;
    }


    registrar = async () => {
        try {
            const errores: string[] = this.validarRegistroEstudiante(this.datosRegistro);

            if (errores.length > 0) {
                this.activarOverlay('', 'error.webp', 'red', 'Error', errores);
                this.mostrarOverlay = true;
                return;
            }

            if(this.datosRegistro.contrasena != this.datosRegistro.confirmacion_contrasena){
                this.activarOverlay('Las contraseñas no coinciden.', 'error.webp', 'red', 'Error', []);
                this.mostrarOverlay = true;
                return;
            }

            await this.authService.registrar(this.datosRegistro);
            this.registroExitoso();
            this.limpiarCampos();

        } catch (error) {
            this.manejoErroresRegistrar(error);
        }

    };

    login = async () : Promise<any> => {

        try {
            
            if (this.datosLogin.email == '' && this.datosLogin.contrasena == '') {
                this.activarOverlay('Debes ingresar tus credenciales.', 'error.webp', 'red', 'Error', []);
                this.mostrarOverlay = true;
                return;
            }
            
            const res = await this.authService.ingresar(this.datosLogin);
            this.sesionExitosa(res);
            this.limpiarCampos();

        } catch (error) {
            this.manejoErroresLogin(error);
        }
    };

    activarOverlay = (mensaje: string, icon: string, color: string, alt: string, lista: string[]) => {
        this.opciones.mensaje =  mensaje;
        this.opciones.icon = icon;
        this.opciones.color =  color;
        this.opciones.lista = lista;
        this.opciones.alt = alt;
        this.accionesOverlay.redireccionar = false;
        this.accionesOverlay.ocultar = true;
    }

    limpiarCampos = () => {
        this.datosRegistro.apellido = '';
        this.datosRegistro.cedula = null;
        this.datosRegistro.contrasena = '';
        this.datosRegistro.edad = null;
        this.datosRegistro.generoId = 0;
        this.datosRegistro.email = '';
        this.datosRegistro.nombre = '';
        this.datosRegistro.confirmacion_contrasena = '';
        this.datosRegistro.contrasena = '';
        this.datosRegistro.celular = '';
    };


    //GUARDA EL TOKEN Y ENCRIPTA EL TOKEN QUE ENVIA EL SERVIDOR
    sesionExitosa = (res: any) => {
        const { usuario } = res;
        usuario.token = encriptar(usuario.token);
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/modulos']);
    };

    
    verificar =  async () => {
        try {
            const usuario = buscarEnSesionStorage('usuario');
            if (!usuario) {
                this.router.navigate(['/iniciar-sesion']);
                return;
            }

            const token = desencriptar(usuario.token);
            const res = await this.authService.verificarToken(token);
            if (res.status == 200) {
                console.log(res)
            }else{
                console.log(res);
            }
        } catch (error) {
            console.log(error)
        }
    };

    validarRegistroEstudiante = (est: IEstudianteRegistrar): string[] => {
        const errores: string[] = [];

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


    manejoErroresLogin = (error: any) => {
        if (error.status == 400) {
            this.activarOverlay('Credenciales Incorrectas.', 'error.webp', 'red', 'Error', []);
        }
        else if(error.status > 400){
            this.activarOverlay('Error en el cliente.', 'error.webp', 'red', 'Error', []);
        }
        else if (error.status >= 500) {
            this.activarOverlay('Error en el servidor.', 'error.webp', 'red', 'Error', []);
        }
        else {
            this.activarOverlay('Error al iniciar sesión.', 'error.webp', 'red', 'Error', []);
        }

        this.mostrarOverlay = true;
    };


    manejoErroresRegistrar = (error: any) => {
        if (error.status == 409) {
            this.activarOverlay(error.error.mensaje, 'error.webp', 'red', 'Error', []);
        }

        if (error.status >= 500) {
            this.activarOverlay('Se ha presentado un error del lado del servidor.', 'error.webp', 'red', 'Error', []);
        }

        if (error.status >= 400) {
            this.activarOverlay('Se ha presentado un error del lado del cliente.', 'error.webp', 'red', 'Error', []);
        }
    };


    registroExitoso = () => {
        this.activarOverlay('Estudiante registrado Exitosamente.', 'comprobado.webp', '#1A1731', 'Registrado', []);
        this.mostrarOverlay = true;
        this.limpiarCampos();
    };

    registrandose = () => {
        this.isRegistrando = true;
        this.isIngresando = false;
    };
    
    ingresando = () => {
        this.isIngresando = true;
        this.isRegistrando = false;
    };
}
