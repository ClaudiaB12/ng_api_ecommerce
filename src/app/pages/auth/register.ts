import { Component } from '@angular/core';
import { AuthLogoWidget } from "@/pages/auth/components/authlogowidget";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService, RegisterRequest } from '../service/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        AuthLogoWidget,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        RouterModule,
    ],
    template: `
        <section class="animate-fadein animate-duration-300 animate-ease-in relative lg:pb-14 lg:py-52 py-36">
            <div class="landing-container mx-auto relative z-10 px-12">
                <div class="relative mt-28 max-w-[46rem] mx-auto">
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[4deg] lg:rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] lg:-rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <form (ngSubmit)="register  ()"
                        class="space-y-8 p-8 relative z-10 bg-white/64 dark:bg-surface-800 backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)]"
                    >
                        <div class="pt-8 pb-8">
                            <div class="flex items-center justify-center">
                                <auth-logo-widget/>
                            </div>
                            <h1 class="text-4xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 text-center">
                                Register</h1>
                            <p class="text-center lg:text-xl text-surface-500 mt-6">Ingrese los datos de la cuenta.</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="username" class="font-medium text-surface-500 dark:text-white/64">Nombre</label>
                            <input name="username" pInputText id="username" [(ngModel)]="username" class="w-full"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-medium text-surface-500 dark:text-white/64">Correo Electrónico</label>
                            <input name="email" pInputText id="email" [(ngModel)]="email" class="w-full"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password"
                                   class="font-medium text-surface-500 dark:text-white/64">Contraseña</label>
                            <input name="password" pInputText id="password" type="password" [(ngModel)]="password" class="w-full"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="address"
                                   class="font-medium text-surface-500 dark:text-white/64">Dirección</label>
                            <input name="address" pInputText id="address" type="address" [(ngModel)]="address" class="w-full"/>
                        </div>
						<div class="flex flex-col gap-2">
                            <label for="phone"
                                   class="font-medium text-surface-500 dark:text-white/64">Teléfono</label>
                            <input name="phone" pInputText id="phone" type="phone" [(ngModel)]="phone" class="w-full"/>
                        </div>
                        <p-button type="submit" styleClass="w-full mt-8" rounded>Registrar</p-button>
                        <div class="flex items-center justify-center gap-2">
                            <span class="text-surface-500 dark:text-white/64">Ya tiene una cuenta?</span>
                            <a routerLink="/landing/login" class="text-primary">Inicie Sesión</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class Register {
    username = '';
    email = '';
    password = '';
    address = '';
    phone = '';

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        if (!this.username || !this.email || !this.password || !this.address || !this.phone) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        const data: RegisterRequest = { name: this.username, email: this.email, password: this.password, address: this.address, phone: this.phone };
        this.authService.register(data).subscribe({
            next: (response) => {
                alert(response?.message || 'Registro exitoso');
                this.router.navigate(['/landing/login']);
            },
            error: (err) => {
                console.error('Error al registrar usuario:', err);

                if (err.status === 400) {
                    alert(err.error?.message || 'Datos inválidos');
                } else if (err.status === 409) {
                    alert('El correo electrónico ya está registrado.');
                } else {
                    alert('Error inesperado al registrar usuario.');
                }
            }
        });
    }
}
