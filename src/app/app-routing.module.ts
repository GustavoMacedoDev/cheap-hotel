import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ConsultaComponent} from './hotel/consulta/consulta.component';
import { CadastroComponent } from "./hotel/cadastro/cadastro.component";


const routes: Routes = [
  { path: 'home',                   component: HomeComponent },
  { path: '',                       component: HomeComponent },
  { path: 'consulta-hotel',         component: ConsultaComponent },
  { path: 'cadastro-hotel',         component: CadastroComponent },
  { path: 'cadastro-hotel/:id',     component: CadastroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
