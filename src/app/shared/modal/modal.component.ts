import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogClose, MatDialogActions } from '@angular/material/dialog';

@Component({
    selector: 'app-modal',
    imports: [MatDialogClose],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent {

    constructor(
        public matDialogRef: MatDialogRef<ModalComponent>, 
        @Inject(MAT_DIALOG_DATA) public data:any) 
    {

    }
}
