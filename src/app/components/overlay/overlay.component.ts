import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpcionesOverlay } from '../../interfaces/OpcionesOverlay';
import { FormsModule } from '@angular/forms';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
    selector: 'app-overlay',
    imports: [FormsModule],
    templateUrl: './overlay.component.html',
    styleUrl: './overlay.component.css'
})
export class OverlayComponent {
    @Input() opciones!: OpcionesOverlay;
    @Input() desactivar!: () => void;
    @Input() activeOverlay = false;

    @Input() redireccionar = false;
    @Output() datoEmitidoRecargar = new EventEmitter<boolean>();
    @Output() datoEmitidoOcultar = new EventEmitter<boolean>();
    ocultar = false;


    constructor(private comunicacionService: ComunicacionService,) { }


    activarOverlay = (color: string, icon: string, mensaje: string, alt: string, lista: string[]) => {
        this.opcionesOverlay.color = color;
        this.opcionesOverlay.icon = icon;
        this.opcionesOverlay.mensaje = mensaje;
        this.opcionesOverlay.alt = alt;
        this.opcionesOverlay.lista = lista;
        this.activeOverlay = true;
    };


    opcionesOverlay: OpcionesOverlay = {
        mensaje: '',
        icon: '',
        color: '',
        alt: '',
        lista: []
    }

    ocultarOverlay = () => {

        this.ocultar = true;
        this.datoEmitidoOcultar.emit(true);
        this.datoEmitidoRecargar.emit(true);
        this.opcionesOverlay.color = '';
        this.opcionesOverlay.icon = '';
        this.opcionesOverlay.mensaje = '';
        this.opcionesOverlay.alt = '';

        if (this.redireccionar) {
            this.comunicacionService.tokenExpirado();
        }
    }

}


