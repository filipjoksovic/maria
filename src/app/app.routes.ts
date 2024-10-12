import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home.page/home.page.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { SetupComponent } from '../pages/setup/setup.component';
import { MakeRequestComponent } from '../pages/make-request/make-request.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'new',
                component: MakeRequestComponent
            }
        ]
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'setup',
        component: SetupComponent
    },

];
