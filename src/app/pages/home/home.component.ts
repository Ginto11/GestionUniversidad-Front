import { Component, OnInit } from '@angular/core';
import { NavSesionComponent } from "../../components/nav-sesion/nav-sesion.component";

@Component({
  selector: 'app-home',
  imports: [NavSesionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  nombre = JSON.parse(localStorage.getItem('user') || '{}').nombre;

  ngOnInit(): void {
    localStorage.removeItem('user');
  } 
}
