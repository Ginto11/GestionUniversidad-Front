import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOpcionesOverlay } from '../../interfaces/IOpcionesOverlay';
import { FormsModule } from '@angular/forms';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
    selector: 'app-overlay',
    imports: [FormsModule],
    templateUrl: './overlay.component.html',
    styleUrl: './overlay.component.css'
})
export class OverlayComponent {
    @Input() opciones!: IOpcionesOverlay;
    @Input() accionesOverlay: any;
    @Output() datoEmitidoOcultar = new EventEmitter<boolean>();


    constructor(private comunicacionService: ComunicacionService,) { }


    ocultarOverlay = () => {    

        if(this.accionesOverlay.ocultar) {
            this.datoEmitidoOcultar.emit(true);
        }
        
        if (this.accionesOverlay.redireccionar) {
            this.comunicacionService.tokenExpirado();
        }
    }

}


