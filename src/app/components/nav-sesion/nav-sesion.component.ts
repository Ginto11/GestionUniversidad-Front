import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-sesion',
  imports: [],
  templateUrl: './nav-sesion.component.html',
  styleUrl: './nav-sesion.component.css'
})
export class NavSesionComponent {
    @Input() nombre!: string;
}
