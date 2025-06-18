import { OpcionesOverlay } from "../interfaces/OpcionesOverlay"
import { EstudianteLogin } from "../interfaces/EstudianteLogin"
import { EstudianteRegistrar } from "../interfaces/EstudianteRegistrar"

export const opcionesOverlay: OpcionesOverlay = {
    mensaje: '',
    icon: '',
    color: '',
    alt: '',
    lista: []
  }

export const estudianteLogin: EstudianteLogin = {
    email: '',
    contrasena: ''
  }

export const  estudianteRegistrar: EstudianteRegistrar = {
    cedula: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    email: '',
    contrasena: '',
    generoId: 0
  }
