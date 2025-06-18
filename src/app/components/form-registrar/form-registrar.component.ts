import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstudianteRegistrar } from '../../interfaces/EstudianteRegistrar';

@Component({
    selector: 'app-form-registrar',
    imports: [FormsModule],
    templateUrl: './form-registrar.component.html',
    styleUrl: './form-registrar.component.css',
    standalone: true
})
export class FormRegistrarComponent {
    @Input() login!: () => void;
    @Input() estudianteRegistrar!: EstudianteRegistrar;
    @Input() registrar!: () => void;
    @Input() ingresando!: () => void;
}
