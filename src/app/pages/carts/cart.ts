import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Cart, CartService } from '@/pages/service/cart.service';
import { jwtDecode } from 'jwt-decode';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule
    ],
    template: ` 
        <div class="space-y-4">
            <div class="card">
            <div class="font-semibold text-xl mb-4">Agregados al Carrito</div>
            <p-table
                #dt1
                [value]="carts"
                dataKey="id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                 responsiveLayout="scroll"
            >

                <ng-template #header>
                    <tr>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Producto
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Valor unitario
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Cantidad
                            </div>
                        </th>
                        <th style="min-width: 8rem">
                            <div class="flex justify-between items-center" > </div> 
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-cart>
                    <tr>
                        <td>
                            {{ cart.productNav.name }}
                        </td>
                        <td>
                            {{ cart.productNav.price | currency: 'USD' : 'symbol' }}
                        </td>
                        <td>
                            {{ cart.quantity }}
                        </td>
                        <td>
                            <button 
                                pButton 
                                type="button" 
                                icon="pi pi-shopping-cart" 
                                label="Remover"
                                (click)="removeFromCart(cart)">
                            </button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No existen productos en el carrito.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Cargando productos. Espere por favor.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
       
    </div>`,

    providers: [CartService]
})

export class CartList implements OnInit {
    carts: Cart[] = [];
    loading: boolean = true;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        const decoded: any = jwtDecode(token!);
        this.loading = true;
        this.cartService.getCartsByClient(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]).subscribe({
            next: (data) => {
                this.carts = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error al obtener productos:', err);
                this.loading = false;
            }
        });
    }

    removeFromCart(removeCart: Cart) {
            const cart: Cart = {
            client: removeCart.client,
            product: removeCart.product,
            quantity: -1
        };

        this.cartService.saveOrUpdateCart(cart).subscribe({
            next: () => {
                const index = this.carts.findIndex(c =>
                c.id === removeCart.id);
                const existingCart = this.carts[index];
                const newQuantity = (existingCart.quantity || 0) - 1;

                if (newQuantity <= 0) {
                    this.carts.splice(index, 1); 
                } else {
                    this.carts[index] = {
                        ...existingCart,
                        quantity: newQuantity
                    };
                }

                alert('Producto removido del carrito');
            },
            error: (err: any) => {
                console.error('Error al remover del carrito:', err);
                alert('No se pudo remover del carrito');
            }
        });
    }
}    
