import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IEstudianteRegistrar } from '../../interfaces/IEstudianteRegistrar';

@Component({
    selector: 'app-form-registrar',
    imports: [FormsModule],
    templateUrl: './form-registrar.component.html',
    styleUrl: './form-registrar.component.css',
    standalone: true
})
export class FormRegistrarComponent {
    @Input() login!: () => void;
    @Input() estudianteRegistrar!: IEstudianteRegistrar;
    @Input() registrar!: () => void;
    @Input() ingresando!: () => void;
}
