import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormIngresarComponent } from "../../shared/form-ingresar/form-ingresar.component";
import { IEstudianteRegistrar } from 'src/app/interfaces/IEstudianteRegistrar';
import { FormRegistrarComponent } from '../../shared/form-registrar/form-registrar.component';
import { encriptar } from 'src/app/util/util.encrypt';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ViewportScroller } from '@angular/common';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-login',
    imports: [FormsModule, FormIngresarComponent, FormRegistrarComponent, FooterComponent],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export default class LoginComponent implements OnInit {

    constructor(
        private modalService: ModalService,
        private authService: AuthService, 
        private router: Router, 
        private viewPortScroller: ViewportScroller) 
    { }

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
    
    isIngresando = true;
    isRegistrando = false;

    ngOnInit(): void {
        this.viewPortScroller.scrollToPosition([0, 0]);
    }

    registrar = async () => {
        try {
            const errores: string[] = this.validarRegistroEstudiante(this.datosRegistro);

            if (errores.length > 0) {
                this.modalService.abrirModal(ModalComponent, {
                    altImg: 'Imagem de error.',
                    colorTexto: 'Red',
                    srcImg: 'error.webp',
                    listaErrores: errores,
                    mensaje: '',
                    redireccionar: false
                })
                return;
            }

            if(this.datosRegistro.contrasena != this.datosRegistro.confirmacion_contrasena){

                this.modalService.abrirModal(ModalComponent, {
                    altImg: 'Imagen de error.',
                    colorTexto: 'Red',
                    srcImg: 'error.webp',
                    listaErrores: [],
                    mensaje: 'Las contraseñas no coinciden.',
                    redireccionar: false
                })
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

                this.modalService.abrirModal(ModalComponent, {
                    colorTexto: 'Red',
                    mensaje: 'Debes ingresar tus credenciales.',
                    srcImg: 'error.webp',
                    altImg: 'Imagen de error.',
                    listaErrores: [],
                    redireccionar: false
                })
                return;
            }
            
            const res = await this.authService.ingresar(this.datosLogin);
            this.sesionExitosa(res);
            this.limpiarCampos();

        } catch (error) {
            this.manejoErroresLogin(error);
        }
    };

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

    
    /*verificar =  async () => {
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
    };*/

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

            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Credenciales Incorrectas.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })

        }
        else if(error.status > 400){
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error en el cliente.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }
        else if (error.status >= 500) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error en el servidor.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }
        else {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error al iniciar sesión.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }

    };


    manejoErroresRegistrar = (error: any) => {
        if (error.status == 409) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: error.error.mensaje,
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }

        if (error.status >= 500) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error en el servidor.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }

        if (error.status >= 400) {
            this.modalService.abrirModal(ModalComponent, {
                mensaje: 'Error en el cliente.',
                srcImg: 'error.webp',
                colorTexto: 'Red',
                altImg: 'Imagen de error.',
                listaErrores: [],
                redireccionar: false
            })
        }
    };


    registroExitoso = () => {
        this.modalService.abrirModal(ModalComponent, {
            colorTexto: '#1A1731',
            mensaje: 'Estudiante registrado exitosamente',
            srcImg: 'comprobado.webp',
            altImg: 'Imagen de registrado.',
            listaErrores: [],
            redireccionar: false
        })
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
