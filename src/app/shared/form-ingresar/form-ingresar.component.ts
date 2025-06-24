import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IEstudianteLogin } from '../../interfaces/IEstudianteLogin';

@Component({
    selector: 'app-form-ingresar',
    imports: [FormsModule],
    templateUrl: './form-ingresar.component.html',
    styleUrl: './form-ingresar.component.css'
})
export class FormIngresarComponent {
    @Input() login!: () => void;
    @Input() estudianteLogin!: IEstudianteLogin;
    @Input() registrandose!: () => void;

}
