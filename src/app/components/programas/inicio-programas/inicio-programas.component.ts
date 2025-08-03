import { Component } from '@angular/core';
import { HeaderSesionComponent } from "src/app/shared/header-sesion/header-sesion.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterSesionComponent } from "src/app/shared/footer-sesion/footer-sesion.component";

@Component({
  selector: 'app-inicio-programas',
  imports: [HeaderSesionComponent, RouterOutlet, FooterSesionComponent, RouterLink, RouterLinkActive],
  templateUrl: './inicio-programas.component.html',
  styleUrl: './inicio-programas.component.css'
})
export default class InicioProgramasComponent {

}
