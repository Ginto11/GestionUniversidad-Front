import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-nav-sesion',
  imports: [RouterLink],
  templateUrl: './nav-sesion.component.html',
  styleUrl: './nav-sesion.component.css'
})
export class NavSesionComponent {

  constructor(private router: Router, private comunicacionService: ComunicacionService){}

  @Input() userLogue!: boolean; 
  @Input() nombre!: string;

  cerrarSesion = () => {
    sessionStorage.removeItem('user');
    this.comunicacionService.ocultarLinksEnModulos(true);
    this.router.navigate(['/']);
  }
}
