import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthLogoWidget } from '@/pages/auth/components/authlogowidget';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, AuthLogoWidget, RouterModule, InputTextModule, FormsModule, CheckboxModule, ButtonModule],
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
                    <form (ngSubmit)="login()"
                        class="space-y-8 p-8 relative z-10 bg-white/64 dark:bg-surface-800 backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)]"
                    >
                        <div class="pt-8 pb-8">
                            <div class="flex items-center justify-center">
                                <auth-logo-widget />
                            </div>
                            <h1 class="text-4xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 text-center">E-Commerce</h1>
                            <p class="text-center lg:text-xl text-surface-500 dark:text-white/64 mt-6 max-w-sm mx-auto">Ingrese su usuario y contraseña para ingresar al sistema.</p>
                        </div>
                        
                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-medium text-surface-500 dark:text-white/64">Correo Electrónico</label>
                            <input name="email" pInputText id="email" [(ngModel)]="email" class="w-full" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password" class="font-medium text-surface-500 dark:text-white/64">Contraseña</label>
                            <input name="password" pInputText id="password" type="password" [(ngModel)]="password" class="w-full" />
                        </div>
                        
                        <p-button type="submit" styleClass="w-full mt-8" rounded>Iniciar sesion</p-button>
                        <div class="flex items-center justify-center gap-2">
                            <span class="text-surface-500 dark:text-white/64">No Registrado?</span>
                            <a routerLink="/landing/register" class="text-primary">Registrarse</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class Login {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        if (!this.email || !this.password) {
            alert('Por favor ingresa email y contraseña.');
            return;
        }

        this.authService.isValidUser(this.email, this.password).subscribe({
            next: (response) => {
                const token = response?.token;
                const message = response?.message;

                if (token) {
                    localStorage.setItem('auth_token', token);
                    this.router.navigate(['/landing/products']);
                } else {
                    alert('No se recibió token, verifique credenciales');
                }
            },
            error: (err) => {
                console.error('Error de login:', err);

                if (err.status === 401) {
                    alert('Credenciales incorrectas');
                } else if (err.status === 0) {
                    alert('No se pudo conectar al servidor');
                } else {
                    alert('Error inesperado al iniciar sesión');
                }
            }
        });
    }
}



