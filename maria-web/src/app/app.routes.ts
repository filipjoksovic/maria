import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home.page/home.page.component";
import {MakeRequestComponent} from "../pages/make-request/make-request.component";
import {SignupPageComponent} from "../pages/signup-page/signup-page.component";
import {MainLayoutComponent} from "../layout/main-layout/main-layout.component";
import {FormsLayoutComponent} from "../layout/forms-layout/forms-layout.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {
    path: 'account',
    component: FormsLayoutComponent,
    children: [
      {path: 'signup', component: SignupPageComponent}
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'new',
        component: MakeRequestComponent
      },
      {
        path: "request/:id",
        component: MakeRequestComponent
      }
    ]
  }

];
