import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-estudiantes',
  imports: [],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrl: './tabla-estudiantes.component.css'
})
export class TablaEstudiantesComponent {
  @Input() estudiantes: any;
}
