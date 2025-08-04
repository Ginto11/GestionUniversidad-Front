import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    imports: [MatDialogClose],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent {



    constructor(
        private router: Router,
        public matDialogRef: MatDialogRef<ModalComponent>, 
        @Inject(MAT_DIALOG_DATA) public data:any) 
    {

    }

    redireccionarAHome = () :void => {
        this.router.navigate(['/iniciar-sesion']);
        this.matDialogRef.close();
        sessionStorage.removeItem('usuario');
    }
}
