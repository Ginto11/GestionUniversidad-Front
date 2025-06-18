import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstudianteLogin } from '../../interfaces/EstudianteLogin';

@Component({
    selector: 'app-form-ingresar',
    imports: [FormsModule],
    templateUrl: './form-ingresar.component.html',
    styleUrl: './form-ingresar.component.css'
})
export class FormIngresarComponent {
    @Input() login!: () => void;
    @Input() estudianteLogin!: EstudianteLogin;
    @Input() registrandose!: () => void;

}
