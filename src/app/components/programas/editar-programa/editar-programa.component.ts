import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramaService } from 'src/app/services/programas/programas.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Programa } from 'src/app/models/programa.model';
import { Facultad } from 'src/app/models/facultad.model';
import { TipoModalService } from 'src/app/services/modal/tipo-modal.service';
import { FacultadService } from 'src/app/services/facultades/facultad.service';
import { IProgramaRegistrar } from 'src/app/interfaces/IProgramaRegistrar';
import { RouterLink } from '@angular/router';
import { environment } from '@envs/environment';

@Component({
  selector: 'app-editar-programa',
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-programa.component.html',
  styleUrl: './editar-programa.component.css'
})
export default class EditarProgramaComponent {
  nombreFormulario = 'Editando programa';

  isCargando = false;

  IMG_URL = environment.IMG_URL;

  programaPorEditar: Programa = new Programa();
  facultades: Facultad[] = [];

  programaService = inject(ProgramaService);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  tipoModalService = inject(TipoModalService);
  facultadService = inject(FacultadService);

  imagenBase64 = '';

  programa: IProgramaRegistrar = {
    nombre: '',
    descripcion: '',
    duracion: null,
    facultadId: '',
    archivo: null
  }

  constructor() {

    this.init();
  }

  init = async () => {

    await this.traerFacultades();

    const id = this.activatedRoute.snapshot.params['id'];

    this.programaPorEditar = await this.programaService.buscarPorId(id);
  }

  traerFacultades = async () => {
    try {
      if (await this.authService.validarSesion() == false) {
        this.tipoModalService.tokenExpirado();
        return;
      }

      this.facultades = await this.facultadService.traerFacultades();
    } catch (error) {
      this.tipoModalService.manejoError(error);
    }
  }

  cambiarImagen = () => {
    const $input = document.getElementById('cambiar-img');
    $input?.click();
  }

  alSeleccionarAchivo = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) {

      const reader = new FileReader();
      reader.onload = () => {
        const imagenUrl = reader.result as string;
        this.imagenBase64 = imagenUrl;
      };
      reader.readAsDataURL(archivo);

      this.programa.archivo = archivo;
      this.programaPorEditar.archivo = archivo;
      this.programaPorEditar.rutaImagen = archivo.name;
    }
  }

  actualizarPrograma = async () => {
    try {
      console.log(this.programaPorEditar);

      /*if (!this.programaPorEditar.nombre || !this.programaPorEditar.descripcion || !this.programaPorEditar.duracion || !this.programaPorEditar.facultadId || !this.programa.archivo) {
        this.tipoModalService.manejoErrorGenerico('Todos los campos son obligatorios');
        return;
      }*/

      const formData = new FormData();
      formData.append('nombre', this.programaPorEditar.nombre);
      formData.append('duracion', this.programaPorEditar.duracion.toString());
      formData.append('descripcion', this.programaPorEditar.descripcion);
      formData.append('imagen', this.programaPorEditar.archivo as File);

      console.log(formData);

    } catch (error) {
      console.log(error);
    }
  }
}
