import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

}
