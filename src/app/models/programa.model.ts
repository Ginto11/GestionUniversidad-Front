import { IPrograma } from "../interfaces/IPrograma";

export class Programa implements IPrograma {
    id: number = 0;
    nombre: string = '';
    descripcion: string = '';
    duracion: number = 0;
    facultad: string = '';
    rutaImagen: string = '';
}