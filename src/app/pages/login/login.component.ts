import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public loginService: LoginService, private router: Router){ }

  loginEmail = ''
  loginContrasena = ''

  async login(){

    const usuario = {
      email: this.loginEmail,
      contrasena: this.loginContrasena
    };

    await this.loginService.ingresar(usuario).subscribe({
      next: (respuesta) => {
        const { usuario } = respuesta;
        console.log('Login exitoso:', respuesta);
        localStorage.setItem('user', JSON.stringify(usuario));

        this.router.navigate(['/home'])
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    })
  }
}
