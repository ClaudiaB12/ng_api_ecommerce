import { Routes } from '@angular/router';

export default [
    
    {
        path: 'error',
        redirectTo: '/notfound'
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
