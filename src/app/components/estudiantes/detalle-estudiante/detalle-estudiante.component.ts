import { Component } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { FormsModule } from '@angular/forms';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detalle-estudiante',
    imports: [FormsModule, CommonModule],
    templateUrl: './detalle-estudiante.component.html',
    styleUrl: './detalle-estudiante.component.css'
})

export default class DetalleEstudianteComponent {
    estudiante: Estudiante = new Estudiante();

    cedula = null;

    constructor(private estudiantesService: EstudianteServices){}

    buscarEstudiante = async () => {
        console.log(this.estudiante)
        if(!this.cedula){
            alert('Ingrese un numero de cedula.');
            return;
        }

        this.estudiante = await this.estudiantesService.buscarPorCedula(this.cedula);

    }
}
