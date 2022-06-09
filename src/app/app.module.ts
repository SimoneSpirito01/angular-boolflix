import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CardComponent } from './card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DetailsComponent } from './details/details.component';
import { ApiService } from './api.service';
import { DxDataGridModule, DxTemplateModule, DxGalleryModule, DxTagBoxModule, DxSelectBoxModule, DxToolbarModule, DxFormModule, DxDropDownButtonModule } from 'devextreme-angular';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    LogoComponent,
    NavbarComponent,
    SearchBarComponent,
    HomeComponent,
    CategoryComponent,
    CardComponent,
    FiltersComponent,
    FavoritesComponent,
    DetailsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxGalleryModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxToolbarModule,
    DxFormModule,
    DxDropDownButtonModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
