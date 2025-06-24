import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { ActivatedRoute } from '@angular/router';
import { EstudianteServices } from 'src/app/services/estudiantes/estudiante.service';
import { FormsModule } from '@angular/forms';
import { IGenero } from 'src/app/interfaces/IGenero';
import { GenerosServices } from 'src/app/services/generos/generos.service';

@Component({
    selector: 'app-editar-estudiante',
    imports: [FormsModule],
    templateUrl: './editar-estudiante.component.html',
    styleUrl: './editar-estudiante.component.css'
})
export default class EditarEstudianteComponent implements OnInit {

    nombreFormulario: string = 'Editando Estudiante';
    estudiante: Estudiante = new Estudiante;
    generos: IGenero[] = [];

    constructor(private activatedRoute: ActivatedRoute, private estudiantesService: EstudianteServices, private generosService: GenerosServices) { }


    ngOnInit(): void {
        this.mostrarEstudiante();
    }


    mostrarEstudiante = async () => {
        try{
            const id = this.activatedRoute.snapshot.params['id'];
            if(id){
                this.estudiante = await this.estudiantesService.buscarPorId(id);
                this.traerGeneros();
                console.log(this.estudiante)
            }
        }catch (error) {
            console.error('Error al cargar el estudiante:', error);
        }
    }


    traerGeneros = async () => {
        try {
            this.generos = await this.generosService.listarGeneros();
            console.log(this.generos);
        } catch (error) {
            console.error('Error al cargar los géneros:', error);
        }
    }

}