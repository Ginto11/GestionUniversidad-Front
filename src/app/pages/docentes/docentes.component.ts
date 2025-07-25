import { Component } from '@angular/core';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';

@Component({
    selector: 'app-docentes',
    imports: [RouterLink, HeaderSesionComponent, RouterOutlet, FooterSesionComponent],
    templateUrl: './docentes.component.html',
    styleUrl: './docentes.component.css'
})
export default class DocentesComponent {



}
