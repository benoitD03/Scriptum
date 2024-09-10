import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SearchComponent} from "./pages/search/search.component";
import {LibraryComponent} from "./pages/library/library.component";
import {ProfileComponent} from "./pages/profile/profile.component";
export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'search', component: SearchComponent},
  {path: 'profile', component: ProfileComponent},

];
