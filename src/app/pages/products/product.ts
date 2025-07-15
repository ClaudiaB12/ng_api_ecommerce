import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Product, ProductService } from '@/pages/service/product.service';
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
            <div class="font-semibold text-xl mb-4">Productos Disponibles</div>
            <p-table
                #dt1
                [value]="products"
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
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Descripción
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Precio
                            </div>
                        </th>
                        
                        <th style="min-width: 8rem">
                            <div class="flex justify-between items-center" > </div> 
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>
                            {{ product.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <span>{{ product.description }}</span>
                            </div>
                        </td>
                        <td>
                            {{ product.price | currency: 'USD' : 'symbol' }}
                        </td>
                        <td>
                            <button 
                                pButton 
                                type="button" 
                                icon="pi pi-shopping-cart" 
                                label="Agregar"
                                (click)="addToCart(product)">
                            </button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No existen productos.</td>
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

    providers: [ProductService]
})

export class ProductList implements OnInit {
    products: Product[] = [];
    loading: boolean = true;

    constructor(private productService: ProductService, private cartService: CartService) { }

    ngOnInit(): void {
        this.loading = true;
        this.productService.getAllProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error al obtener productos:', err);
                this.loading = false;
            }
        });
    }

    addToCart(product: Product) {
        const token = localStorage.getItem('auth_token');
        const decoded: any = jwtDecode(token!);
 
        const cart: Cart = {
            client: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            product: product.id,
            quantity: 1
        };

        this.cartService.saveOrUpdateCart(cart).subscribe({
            next: () => {
                alert('Producto agregado al carrito');
            },
            error: (err: any) => {
                console.error('Error al agregar al carrito:', err);
                alert('No se pudo agregar al carrito');
            }
        });
    }

}    
