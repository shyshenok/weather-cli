/**
 * Created by shyshenok on 10.07.17.
 */
import {Input, Component, OnInit} from '@angular/core';
import {SharedService} from "../servises/shared-services";

@Component({
  moduleId: module.id,
  selector: 'app-forecast-form',
  templateUrl: './forecast-form.component.html',
  styleUrls: ['./forecast-form.component.css'],
})
export class ForecastWeatherComponent implements OnInit {

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {

    this.sharedService.citySubject.subscribe(city => {
      console.log('forecast city ' + city);
    })
  }
}
