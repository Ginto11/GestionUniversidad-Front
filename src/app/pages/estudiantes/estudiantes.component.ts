import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavSesionComponent } from 'src/app/components/nav-sesion/nav-sesion.component';

@Component({
  selector: 'app-estudiantes',
  imports: [NavSesionComponent],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit{

  nombreUser!: string;
  isUserLogue!: boolean;
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
    this.nombreUser = JSON.parse(sessionStorage.getItem('user') || '{}').nombre;

    (!this.nombreUser) ? this.router.navigate(['/']) :  this.isUserLogue = true;
    
  }

}
