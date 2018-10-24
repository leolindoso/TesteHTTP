import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';



const APP_ROUTES: Routes =[
    { path: '', redirectTo: 'Home',pathMatch: 'full'},
    { path: 'Home', component: HomeComponent},
    { path: 'Pesquisa', component: PesquisaComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);