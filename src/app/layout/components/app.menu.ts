import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '@/pages/service/auth.service';

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    constructor(private authService: AuthService) { }
    model: any[] = [
        {
            label: 'Opciones',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Productos',
                    icon: 'pi pi-list',
                    routerLink: ['/landing/products']
                },
                {
                    label: 'Carrito',
                    icon: 'pi pi-fw pi-shopping-cart',
                    routerLink: ['/landing/carts']
                }
            ]
        },
        { separator: true },
        {
            label: 'Usuarios',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Perfil',
                    icon: 'pi pi-user',
                    routerLink: ['/landing/profile']

                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.authService.logout();
                    }


                },
            ]
        },
    ];
}
