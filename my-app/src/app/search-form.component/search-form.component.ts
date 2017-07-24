/**
 * Created by shyshenok on 10.07.17.
 */
/**
 * Created by shyshenok on 21.06.17.
 */
import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Weather} from '../../models/weather';
import {Router} from '@angular/router';
import {SharedService} from '../servises/shared-services';

@Component({
  selector: 'app-weather',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {

  currentWeather: Weather;

  checkedSwitcherTemp = false;
  checkedSwitcherWind = false;

  queryHistory: Array<string> = [];
  responseHistory: Array<Weather> = [];
  picturesMap: Map<number, string> = new Map<number, string>();

  constructor(private httpClient: Http, private router: Router, private sharedService: SharedService) {
    this.picturesMap.set(1000, 'sunny.jpg');
    this.picturesMap.set(1003, 'partly-cloudy.jpg');
    this.picturesMap.set(1006, 'cloudy.jpg');
    this.picturesMap.set(1009, 'overcast.jpg');
    this.picturesMap.set(1030, 'mist.jpg');
    this.picturesMap.set(1063, 'possibly-rain.jpg');
    this.picturesMap.set(1066, 'small-snow.jpg');
    this.picturesMap.set(1069, 'rain-snow.jpg');
    this.picturesMap.set(1072, 'freezing-drizzle.jpg');
    this.picturesMap.set(1087, 'thundery-outbreaks.jpg');
    this.picturesMap.set(1114, 'blowing-snow.jpg');
    this.picturesMap.set(1117, 'blizzard.jpg');
    this.picturesMap.set(1135, 'fog.jpg');
    this.picturesMap.set(1147, 'freezing-fog.jpg');
    this.picturesMap.set(1150, 'light-drizzle.jpg');
    this.picturesMap.set(1153, 'light-drizzle.jpg');
    this.picturesMap.set(1168, 'freezing-drizzle-rain.jpg');
    this.picturesMap.set(1171, 'heavy-freezing-drizzle.jpg');
    this.picturesMap.set(1180, 'possibly-rain.jpg');
    this.picturesMap.set(1183, 'possibly-rain.jpg');
    this.picturesMap.set(1186, 'moderate-rain.jpg');
    this.picturesMap.set(1189, 'moderate-rain.jpg');
    this.picturesMap.set(1192, 'heavy-rain.jpg');
    this.picturesMap.set(1195, 'heavy-rain.jpg');
    this.picturesMap.set(1201, 'heavy-freezing-drizzle.jpg');
    this.picturesMap.set(1201, 'heavy-freezing-drizzle.jpg');
    this.picturesMap.set(1204, 'rain-snow.jpg');
    this.picturesMap.set(1207, 'rain-snow.jpg');
    this.picturesMap.set(1213, 'small-snow.jpg');
    this.picturesMap.set(1216, 'blowing-snow.jpg');
    this.picturesMap.set(1219, 'blowing-snow.jpg');
    this.picturesMap.set(1222, 'blowing-snow.jpg');
    this.picturesMap.set(1225, 'blowing-snow.jpg');
    this.picturesMap.set(1237, 'ice-pellets.jpg');
    this.picturesMap.set(1240, 'rain-shower.jpg');
    this.picturesMap.set(1243, 'rain-shower.jpg');
    this.picturesMap.set(1246, 'heavy-rain.jpg');
    this.picturesMap.set(1249, 'sleet-light.jpg');
    this.picturesMap.set(1252, 'sleet-heavy.jpg');
    this.picturesMap.set(1255, 'light-snow-showers.jpg');
    this.picturesMap.set(1258, 'heavy-snow-showers.jpg');
    this.picturesMap.set(1261, 'rain-drops.jpg');
    this.picturesMap.set(1264, 'heavy-rain.jpg');
    this.picturesMap.set(1273, 'possibly-rain.jpg');
    this.picturesMap.set(1276, 'heavy-rain.jpg');
    this.picturesMap.set(1279, 'light-snow-showers.jpg');
    this.picturesMap.set(1282, 'heavy-snow-showers.jpg');






  }

  getBackgroundPicture(currentWeather) {
    this.sharedService.backgroundSubject.next(this.picturesMap.get(currentWeather.current.condition.code));
    console.log(`code = ${currentWeather.current.condition.code}`);
  }


  pushToSharedService(inputCity: string) {
    this.sharedService.citySubject.next(inputCity);
  }

  getWeather(inputCity: string) {

    this.addQueryHistory(inputCity);

    this.pushToSharedService(inputCity);

    this.httpClient.get(`http://api.apixu.com/v1/current.json?key=b4c808afa46c4075a74133530173005&q=${inputCity}`)
      .subscribe((data: Response) => {
        this.processWeatherResponse(data);
      });
  }

  processWeatherResponse(data: Response) {
    this.currentWeather = (<Weather>data.json());
    this.addResponseHistory(this.currentWeather);
    this.getBackgroundPicture(this.currentWeather);
  }

  addResponseHistory(weather: Weather) {
    this.responseHistory.unshift(weather);
    if (this.responseHistory.length > 5) {
      this.responseHistory.splice(this.responseHistory.length - 1, 1);
    }
  }

  addQueryHistory(inputCity: string) {
    this.queryHistory.unshift(inputCity);
    if (this.queryHistory.length > 5) {
      this.queryHistory.splice(this.queryHistory.length - 1, 1);
    }
  }

  retrieveFromHistory(weather: Weather) {
    this.currentWeather = weather;
  }

  goToForecast() {
    this.router.navigate(['/forecast']);
  }
}
