import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { FormIngresarComponent } from "../../components/form-ingresar/form-ingresar.component";
import { EstudianteLogin } from '../../models/EstudianteLogin';
import { EstudianteRegistrar } from '../../models/EstudianteRegistrar';
import { FormRegistrarComponent } from '../../components/form-registrar/form-registrar.component';
import { OverlayComponent } from "../../components/overlay/overlay.component";
import { OpcionesOverlay } from '../../models/OpcionesOverlay';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FormIngresarComponent, FormRegistrarComponent, OverlayComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(public loginService: LoginService, private router: Router){ }
  
  isIngresando = true;
  isRegistrando = false;
  activeOverlay = false;


  opcionesOverlay: OpcionesOverlay = {
    mensaje: '',
    icon: '',
    color: '',
    alt: '',
    lista: []
  }

  estudianteLogin: EstudianteLogin = {
    email: '',
    contrasena: ''
  }

  estudianteRegistrar: EstudianteRegistrar = {
    cedula: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    email: '',
    contrasena: '',
    generoId: 0
  }
  
  registrar = () => {
    let errores: string[] = this.validarRegistroEstudiante(this.estudianteRegistrar);

    if (errores.length > 0) {
      this.activarOverlay('red', '/icons/error.png', '', 'IconError', errores);
    } else {
      this.loginService.registrar(this.estudianteRegistrar).subscribe({
        next: (res) => {
          this.activarOverlay('green', '/icons/comprobado.png', 'Estudiante registrado Exitosamente.', 'IconRegistrado', []);
          this.limpiarCampos();
        },
        error: (error) => {
          if(error.status == 409){
            this.activarOverlay('red', '/icons/error.png', error.error.mensaje, 'IconError', []);
          }

          if(error.status >= 500){
            this.activarOverlay('red', '/icons/error.png', 'Se ha presentado un error del lado del servidor.', 'IconError', []);
          }

          if(error.status >= 400){
            this.activarOverlay('red', '/icons/error.png', 'Se ha presentado un error del lado del cliente.', 'IconError', []);
          }
        }
      })
    }
  }

  login = () => {

    if(this.estudianteLogin.email == '' && this.estudianteLogin.contrasena == ''){
      this.activarOverlay('red', '/icons/error.png', '¡Todos los campos son obligatorios.!', 'IconError', []);
      return;
    }

    this.loginService.ingresar(this.estudianteLogin).subscribe({

      next: (respuesta) => {
        this.sesionExitosa(respuesta);
      },
      error: (error) => {
        if(error.status == 400){ 
          this.activarOverlay('red', '/icons/error.png', '¡Credenciales Incorrectas.!', 'IconError', []);
        }

        if(error.status >= 500){
          this.activarOverlay('red', '/icons/error.png', '¡Error en el servidor.!', 'IconError', []);
        }
        console.error('Error al iniciar sesión:', error);
      }
    })
  }

  activarOverlay = (color: string, icon: string, mensaje: string, alt: string, lista: string[]) => {
    this.opcionesOverlay.color = color;
    this.opcionesOverlay.icon = icon;
    this.opcionesOverlay.mensaje = mensaje;
    this.opcionesOverlay.alt = alt;
    this.opcionesOverlay.lista = lista;
    this.activeOverlay = true;
  }

  limpiarCampos = () => {
    this.estudianteRegistrar.apellido = '';
    this.estudianteRegistrar.cedula = 0;
    this.estudianteRegistrar.contrasena = '';
    this.estudianteRegistrar.edad = 0;
    this.estudianteRegistrar.generoId = 0;
    this.estudianteRegistrar.email = '';
    this.estudianteRegistrar.nombre = '';

  }

  sesionExitosa = (res: any) => {
    const { usuario } = res;
    localStorage.setItem('user', JSON.stringify(usuario));
    this.router.navigate(['/home']);
  }

  registrandose = () =>{
    this.isRegistrando = true;
    this.isIngresando = false;
  }
  
  ingresando = () => {
    this.isIngresando = true;
    this.isRegistrando = false;
  }

  desactivarOverlay = () => {
    this.opcionesOverlay.color = '';
    this.opcionesOverlay.icon = '';
    this.opcionesOverlay.mensaje = '';
    this.opcionesOverlay.alt = '';
    this.activeOverlay = false;
  }

  validarRegistroEstudiante = (est: EstudianteRegistrar): string[] => {
    const errores: string[] = [];

    if (est.cedula.toString().length !== 10) errores.push('La cédula debe tener 10 dígitos.');
    if (!est.nombre.trim()) errores.push('El nombre es obligatorio.');
    if (!est.apellido.trim()) errores.push('El apellido es obligatorio.');
    if (est.edad < 16 || est.edad > 100) errores.push('Edad fuera de rango (16-100).');
    if (!est.email.includes('@') || !est.email.includes('.')) errores.push('Correo no válido.');

    if (est.contrasena.length < 6) {
      errores.push('Contraseña inválida (mín. 6 caracteres).');
    }

    if (est.generoId <= 0) errores.push('Seleccione un género válido.');

    return errores;
  }
}
