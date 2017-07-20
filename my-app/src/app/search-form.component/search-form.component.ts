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
import {SharedService} from "../servises/shared-servises";

@Component({
  selector: 'app-weather',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [SharedService]
})
export class SearchFormComponent {

  currentWeather: Weather;

  checkedSwitcherTemp = false;
  checkedSwitcherWind = false;

  queryHistory: Array<string> = [];
  responseHistory: Array<Weather> = [];

  constructor(private httpClient: Http, private router: Router, private sharedService: SharedService) {

  }

  pushToSharedService (inputCity: string) {
    this.sharedService.city = inputCity;
  }

  getWeather(inputCity: string) {
    console.log('clicked ' + inputCity);
    console.log(this.httpClient);

    this.addQueryHistory(inputCity);

    console.log('Add history: ' + this.queryHistory);
    this.pushToSharedService(inputCity);

    this.httpClient.get(`http://api.apixu.com/v1/current.json?key=b4c808afa46c4075a74133530173005&q=${inputCity}`)
      .subscribe((data: Response) => this.processWeatherResponse(data));

  }

  processWeatherResponse(data: Response) {
    this.currentWeather = (<Weather>data.json());
    this.addResponseHistory(this.currentWeather);
  }

  addResponseHistory(weather: Weather) {
    this.responseHistory.unshift(weather);
    if (this.responseHistory.length > 5) {
      this.responseHistory.slice(this.responseHistory.length - 1, 1);
    }
  }

  addQueryHistory(inputCity: string) {
    this.queryHistory.unshift(inputCity);
    if (this.queryHistory.length > 5) {
      this.queryHistory.slice(this.queryHistory.length - 1, 1);
    }
  }

  retrieveFromHistory(weather: Weather) {
    this.currentWeather = weather;
  }

  goToForecast () {
    this.router.navigate(['/forecast']);
  }


}
