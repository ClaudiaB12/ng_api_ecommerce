import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService, UserProfile } from '../service/auth.service';
import {FluidModule} from 'primeng/fluid';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, FluidModule, InputTextModule, FloatLabelModule],
  template: `
    <p-fluid class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2 space-y-4">
              <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Nombre</div>
                <p-floatlabel>
                    <input pInputText id="username1" type="text" [(ngModel)]="profile.name" readonly/>
                </p-floatlabel>
                <div class="font-semibold text-xl">Correo</div>
                <p-floatlabel>
                    <input pInputText id="username1" type="text" [(ngModel)]="profile.email" readonly/>
                </p-floatlabel>
                <div class="font-semibold text-xl">Dirección</div>
                <p-floatlabel>
                    <input pInputText id="username1" type="text" [(ngModel)]="profile.address" readonly/>
                </p-floatlabel>
                <div class="font-semibold text-xl">Teléfono</div>
                <p-floatlabel>
                    <input pInputText id="username1" type="text" [(ngModel)]="profile.phone" readonly/>
                </p-floatlabel>

              </div>
            </div>
    </p-fluid>
    `
})
export class Profile implements OnInit {
  profile: UserProfile = {
  id: 0,
  name: '',
  email: '',
  address: '',
  phone: ''
};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    const decoded: any = jwtDecode(token!);
    this.authService.getProfile(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]).subscribe({
        next: (data) => {
          this.profile = data;
        },
            error: (err) => {
                console.error('Error al obtener perfil:', err);

              }
        });
      }
}
