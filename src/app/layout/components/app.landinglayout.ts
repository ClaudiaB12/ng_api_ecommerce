import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'app-landing-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, AppConfigurator],
    template: ` <div class="w-full min-h-screen">
        
        <main>
            <router-outlet />
        </main>
        <app-configurator location="landing" />
    </div>`
})
export class LandingLayout {
    layoutService: LayoutService = inject(LayoutService);
}
