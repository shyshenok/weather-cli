/**
 * Created by shyshenok on 10.07.17.
 */
import {Component, OnInit} from '@angular/core';
import {SharedService} from '../servises/shared-services';
import {Http, Response} from '@angular/http';
import {ForecastResponse} from '../../models/forecastWeather';

@Component({
  moduleId: module.id,
  selector: 'app-forecast-form',
  templateUrl: './forecast-form.component.html',
  styleUrls: ['./forecast-form.component.css'],
})
export class ForecastWeatherComponent implements OnInit {

  forecastWeather: ForecastResponse;
  weekDaysNames: Array<String> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private httpClient: Http, private sharedService: SharedService) {}

  processForecastWeatherResponse(data: Response) {
    this.forecastWeather = (<ForecastResponse>data.json());
  }

  ngOnInit(): void {

    this.sharedService.citySubject.subscribe(city => {
      this.httpClient.get(`http://api.apixu.com/v1/forecast.json?key=b4c808afa46c4075a74133530173005&q=${city}&days=7`)
        .subscribe((data: Response) => {
          this.processForecastWeatherResponse(data);


          for (const weather of this.forecastWeather.forecast.forecastday) {
            console.log(`weather ${weather.date}`);
          }
        })
    })
  }

  convertDateToTheWeekdayName(forecastDate: string) {
    const currentDays =  new Date(forecastDate);
    const currentForecastDay = this.weekDaysNames[currentDays.getDay()];
    return currentForecastDay;
  }


}
