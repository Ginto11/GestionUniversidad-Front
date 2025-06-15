import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true
})
export class NavComponent {

  isInicio: boolean = true;

  constructor(private comunicacionService: ComunicacionService){
    this.comunicacionService.mostrarLinks.subscribe((data) => {
      this.isInicio = data;
    });
  }

}
