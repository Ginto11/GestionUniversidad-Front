import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IConfigModal } from 'src/app/interfaces/IConfigModal';

@Injectable({ providedIn: 'root' })
export class ModalService {

    private readonly dialog = inject(MatDialog);

    constructor() { }

    abrirModal<T>(Component: ComponentType<T>, data: IConfigModal): void {
        this.dialog.open(Component, {
            width: '400px',
            data: data
        });
    }

    cerrarModal(): void {
        this.dialog.closeAll();
    }
    
}