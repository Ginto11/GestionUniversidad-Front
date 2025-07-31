import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RedireccionService } from 'src/app/services/redireccion/redireccion.service';

@Component({
    selector: 'app-nav-sesion',
    imports: [RouterLink],
    templateUrl: './nav-sesion.component.html',
    styleUrl: './nav-sesion.component.css'
})

export class NavSesionComponent implements OnInit {
    
    isUserLogue!: boolean;
    nombreUser!: string;
    
    constructor(private router: Router, private redireccionService: RedireccionService) { }


    ngOnInit(): void {
        this.validarSesion();
    }

    //VALIDA LA SESION POR MEDIO DEL SESION STORAGE SI NO HAY USER DIRECCIONA AL HOME
    validarSesion = () => {
        this.nombreUser = JSON.parse(sessionStorage.getItem('usuario') || '{}').nombre;
        (!this.nombreUser) ? this.router.navigate(['/']) : this.isUserLogue = true;
    }

    cerrarSesion = () => {
        sessionStorage.removeItem('usuario');
        this.router.navigate(['/']);
    }
}
