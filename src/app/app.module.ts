import { TableOverviewExample } from './data-table/data-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PesquisaService } from './pesquisa.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { routing } from './app.routing';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PesquisaComponent,
    TableOverviewExample
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    
  ],
  providers: [
    PesquisaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
