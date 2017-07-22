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
  providers: [SharedService]
})
export class SearchFormComponent {

  currentWeather: Weather;

  checkedSwitcherTemp = false;
  checkedSwitcherWind = false;

  queryHistory: Array<string> = [];
  responseHistory: Array<Weather> = [];
  picturesMap: Map<number, string> = new  Map<number, string> ();
  backgroundPicture: string;

  constructor(private httpClient: Http, private router: Router, private sharedService: SharedService) {
    this.picturesMap.set (1000, 'sunny.jpg');
    this.picturesMap.set (1003, 'partly-cloudy.jpg');

  }

  getBackgroundPicture(currentWeather) {
    this.sharedService.backgroundSubject.next(this.picturesMap[currentWeather.current.condition.code]);
    console.log(`code = ${currentWeather.current.condition.code}`);
  }


  pushToSharedService(inputCity: string) {
    this.sharedService.citySubject.next(inputCity);
  }

  getWeather(inputCity: string) {
    console.log('clicked ' + inputCity);
    console.log(this.httpClient);

    this.addQueryHistory(inputCity);

    console.log('Add history: ' + this.queryHistory);
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
    console.log('unshift ' + this.responseHistory);
    if (this.responseHistory.length > 2) {
      console.log('responseHistory array ' + this.responseHistory.length);
      this.responseHistory.slice(this.responseHistory.length - 1, 1);

    }
  }

  addQueryHistory(inputCity: string) {
    this.queryHistory.unshift(inputCity);
    if (this.queryHistory.length > 5) {
      this.queryHistory.slice(this.queryHistory.length - 1, 1);
      console.log('queryHistory array ' + this.queryHistory.length);
    }
  }

  retrieveFromHistory(weather: Weather) {
    this.currentWeather = weather;
  }

  goToForecast() {
    this.router.navigate(['/forecast']);
  }


}
