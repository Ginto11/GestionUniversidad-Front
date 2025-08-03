import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProgramaService } from 'src/app/services/programas/programas.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavComponent } from "src/app/shared/nav/nav.component";
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { environment } from '@envs/environment';

@Component({
    selector: 'app-nuestros-programas',
    imports: [FooterComponent, NavComponent],
    templateUrl: './nuestros-programas.component.html',
    styleUrl: './nuestros-programas.component.css'
})
export default class nuestrosProgramasComponent implements OnInit {

    programas: any;
    rutaImagenesProgramas = environment.IMG_URL

    constructor(
        private programaService: ProgramaService, 
        private viewPortScroller: ViewportScroller,
        private tipoModalService: TipoModalService
    ) { }

    ngOnInit(): void {
        this.mostrarProgramas();
        this.viewPortScroller.scrollToPosition([0, 0]);
    }

    mostrarProgramas = async () : Promise<any> => {
        try{

            const res = await this.programaService.listarProgramas();
            this.programas = res;

        }catch(error) {
            this.tipoModalService.manejoError(error);
        }
    }

}
