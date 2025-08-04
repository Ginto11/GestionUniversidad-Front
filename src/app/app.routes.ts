import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'nuestros-programas',
        loadComponent: () => import('./pages/nuestros-programas/nuestros-programas.component')
    },
    {
        path: 'iniciar-sesion',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'nosotros',
        loadComponent: () => import('./pages/nosotros/nosotros.component')
    },
    {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto.component')
    },
    {
        path: 'modulos',
        loadComponent: () => import('./pages/modulos/modulos.component')
    },
    {
        path: 'estudiantes',
        loadComponent: () => import('./components/estudiantes/inicio-estudiantes/inicio-estudiantes.component'),
        children: [
            {
                path: '', 
                redirectTo: 'listar-estudiantes',
                pathMatch: 'full'
            },
            {
                path: 'listar-estudiantes',
                loadComponent: () => import('./components/estudiantes/tabla-estudiantes/tabla-estudiantes.component')
            },
            {
                path: 'editar-estudiante/:id',
                loadComponent: () => import('./components/estudiantes/editar-estudiante/editar-estudiante.component')
            },
            {
                path: 'nuevo-estudiante',
                loadComponent: () => import('./components/estudiantes/nuevo-estudiante/nuevo-estudiante.component')
            },
            {
                path: 'detalle-estudiante',
                loadComponent: () => import('./components/estudiantes/detalle-estudiante/detalle-estudiante.component')
            },
            {
                path: '**',
                redirectTo: 'tabla-estudiantes',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'docentes',
        loadComponent: () => import('./components/docentes/inicio-docentes/inicio-docentes.component'),
        children: [
            {
                path: '',
                redirectTo: 'listar-docentes',
                pathMatch: 'full'
            },
            {
                path: 'listar-docentes',
                loadComponent: () => import('./components/docentes/tabla-docentes/tabla-docentes.component')
            },
            {
                path: 'editar-docente/:id',
                loadComponent: () => import('./components/docentes/editar-docente/editar-docente.component')
            },
            {
                path: 'nuevo-docente',
                loadComponent: () => import('./components/docentes/nuevo-docente/nuevo-docente.component')
            },
            {
                path: 'detalle-docente',
                loadComponent: () => import('./components/docentes/detalle-docente/detalle-docente.component')
            },
            {
                path: '**',
                redirectTo: 'tabla-docentes',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'programas',
        loadComponent: () => import('./components/programas/inicio-programas/inicio-programas.component'),
        children: [
            {
                path: '',
                redirectTo: 'listar-programas',
                pathMatch: 'full'
            },
            {
                path: 'listar-programas',
                loadComponent: () => import('./components/programas/tabla-programas/tabla-programas.component')
            },
            {
                path: 'editar-programa/:id',
                loadComponent: () => import('./components/programas/editar-programa/editar-programa.component')
            },
            {
                path: 'nuevo-programa',
                loadComponent: () => import('./components/programas/nuevo-programa/nuevo-programa.component')
            },
            {
                path: 'detalle-programa',
                loadComponent: () => import('./components/programas/detalle-programa/detalle-programa.component')
            },
            {
                path: '**',
                redirectTo: 'tabla-programas',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },

];

