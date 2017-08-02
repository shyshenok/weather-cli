import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './base-weather.component/search-form.component/search-form.component';
import { ForecastWeatherComponent } from './base-weather.component/forecast-form.component/forecast-form.component';
import {SharedService} from './servises/shared-services';
import {SettingsFormComponent} from './base-weather.component/settings-form.component/settings-form.component';
import {BaseWeatherComponent} from './base-weather.component/base-weather.component';



export const appRoutes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather', component: BaseWeatherComponent ,
    children: [
      { path: '', redirectTo: 'current', pathMatch: 'full' },
      { path: 'current', component: SearchFormComponent },
      { path: 'forecast', component: ForecastWeatherComponent }
    ]

  },

];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, BaseWeatherComponent, SearchFormComponent, ForecastWeatherComponent, SettingsFormComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SharedService]
})
export class AppModule { }
