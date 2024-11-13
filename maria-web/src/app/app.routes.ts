import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home.page/home.page.component";
import {MakeRequestComponent} from "../pages/make-request/make-request.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {
    path: 'new',
    component: MakeRequestComponent
  },
  {
    path: "request/:id",
    component: MakeRequestComponent
  }
];
