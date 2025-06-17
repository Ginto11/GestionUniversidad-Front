import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true
})
export class NavComponent {

  isInicio: boolean = true;

  constructor(private comunicacionService: ComunicacionService, private viewPortScroller: ViewportScroller){
    this.mostrarLinks();
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  mostrarLinks = () => {
    this.comunicacionService.mostrarLinks.subscribe((data) => {
      this.isInicio = data;
    });
  };

};
