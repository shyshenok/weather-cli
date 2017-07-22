import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './search-form.component/search-form.component';
import { ForecastWeatherComponent } from './forecast-form.component/forecast-form.component';
import {SharedService} from './servises/shared-services';



export const appRoutes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'forecast', component: ForecastWeatherComponent },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, SearchFormComponent, ForecastWeatherComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SharedService]
})
export class AppModule { }
