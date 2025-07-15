import {Routes} from '@angular/router';
import {AppLayout} from '@/layout/components/app.layout';
import {LandingLayout} from '@/layout/components/app.landinglayout';
import {AuthLayout} from '@/layout/components/app.authlayout';
import {Notfound} from '@/pages/notfound/notfound';
import { AuthGuard } from '@/pages/service/auth_guard';

export const appRoutes: Routes = [
    {
        path: 'landing',
        canActivate: [AuthGuard],
        component: AppLayout,
        children: [
            {
                path: 'products',
                loadComponent: () => import('@/pages/products/product').then((c) => c.ProductList),
                data: {breadcrumb: 'Productos'}
            }
        ]
    },
    {
        path: 'landing',
        component: LandingLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('@/pages/auth/login').then((c) => c.Login)
            },
            {
                path: 'register',
                loadComponent: () => import('@/pages/auth/register').then((c) => c.Register)
            },
            {
                path: 'error',
                redirectTo: '/notfound'
            }
        ]
    },
    {path: 'notfound', component: Notfound},
    {
        path: 'auth',
        component: AuthLayout,
        children: []
    },
    {path: '**', redirectTo: '/notfound'}
];
