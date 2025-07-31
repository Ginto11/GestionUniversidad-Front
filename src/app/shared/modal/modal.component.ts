import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { RedireccionService } from 'src/app/services/redireccion/redireccion.service';

@Component({
    selector: 'app-modal',
    imports: [MatDialogClose],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent {



    constructor(
        private redireccionService: RedireccionService,
        public matDialogRef: MatDialogRef<ModalComponent>, 
        @Inject(MAT_DIALOG_DATA) public data:any) 
    {

    }

    redireccionarAHome = () :void => {
        this.redireccionService.tokenExpirado();
    }
}
