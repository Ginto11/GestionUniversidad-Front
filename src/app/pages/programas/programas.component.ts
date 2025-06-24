import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
    selector: 'app-programas',
    imports: [FooterComponent],
    templateUrl: './programas.component.html',
    styleUrl: './programas.component.css'
})
export default class ProgramasComponent implements OnInit {

    programas: any;
    rutaImagenesProgramas = 'programas/'

    constructor(private programasService: ProgramasService, private viewPortScroller: ViewportScroller) { }

    ngOnInit(): void {
        this.mostrarProgramas();
        this.viewPortScroller.scrollToPosition([0, 0]);
    }

    mostrarProgramas = async () : Promise<any> => {
        try{

            const res = await this.programasService.listarProgramas();
            this.programas = res;

        }catch(error) {
            console.error('Error al mostrar programas:', error);
        }
    }

}
