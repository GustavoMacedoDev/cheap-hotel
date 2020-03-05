import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './hotel/cadastro/cadastro.component';
import { ConsultaComponent } from './hotel/consulta/consulta.component';
import { MenuComponent } from './menu/menu.component';
import { ConfigService } from './services/config.service';
import { HotelService } from './services/hotel.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    ConsultaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConfigService, HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
