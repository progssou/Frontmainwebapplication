import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gurad/auth.guard';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //forward to login on starting the server
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'register'},
  
  {component:HomeComponent,path:'home',canActivate:[AuthGuard]},
  {component:UserlistingComponent,path:'user',canActivate:[AuthGuard]},
  {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
