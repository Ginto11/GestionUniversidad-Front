import { Component } from '@angular/core';
import { MensajeEmail } from 'src/app/models/mensaje-email.model';
import { FooterComponent } from "src/app/shared/footer/footer.component";
import { NavComponent } from "src/app/shared/nav/nav.component";
import { FormsModule } from '@angular/forms';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
    selector: 'app-contacto',
    imports: [FooterComponent, NavComponent, FormsModule],
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.css'
})
export default class ContactoComponent {

    data: MensajeEmail = {
        nombre: '',
        email: '',
        mensaje: ''
    }

    isCargando: boolean = false;

    constructor(
        private tipoModalService: TipoModalService,
        private emailService: EmailService
    ){}

    enviarMensaje = async (): Promise<void> => {

        const errores = this.validarRegistroMensaje(this.data);
        if (errores.length > 0) {
            this.tipoModalService.mostrarMultiplesErrores(errores);
            return;
        }

        this.isCargando = true;

        try {
            await this.emailService.enviarEmail(this.data);
            this.tipoModalService.manejoExitoso('Mensaje enviado exitosamente');
            this.limpiarCampos();
            this.isCargando = false;
        } catch (error) {
            this.tipoModalService.manejoError(error);
        }
        
    }


    validarRegistroMensaje = (data: MensajeEmail): string[] => {

        const errores: string[] = [];
        console.log(data);

        if(!data.nombre.trim()) errores.push('El nombre es obligatorio.');
        if(!data.email.trim() && !data.email.trim().includes('@')) errores.push('El email es obligatorio.');
        if(!data.mensaje.trim()) errores.push('El mensaje es obligatorio.');

        return errores;
    }

    limpiarCampos = (): void => {
        this.data = {
            nombre: '',
            email: '',
            mensaje: ''
        };
    }

}
