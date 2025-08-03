import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterSesionComponent } from 'src/app/shared/footer-sesion/footer-sesion.component';
import { HeaderSesionComponent } from 'src/app/shared/header-sesion/header-sesion.component';

@Component({
  selector: 'app-inicio-docentes',
  imports: [RouterLinkActive, RouterLink, HeaderSesionComponent, RouterOutlet, FooterSesionComponent],
  templateUrl: './inicio-docentes.component.html',
  styleUrl: './inicio-docentes.component.css'
})
export default class InicioDocentesComponent {

}
