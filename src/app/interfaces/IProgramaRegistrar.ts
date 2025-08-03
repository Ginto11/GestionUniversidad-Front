export interface IProgramaRegistrar {
    nombre: string;
    descripcion: string;
    duracion: string | null;
    facultadId: string | null;
    archivo: File | null;
}