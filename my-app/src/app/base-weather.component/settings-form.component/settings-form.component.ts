/**
 * Created by shyshenok on 02.08.17.
 */
import {Component} from '@angular/core';
import {SettingsServices, SpeedUnit, TemperatureUnit} from '../../servises/settings-services';


@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css'],
})

export class  SettingsFormComponent {

  constructor (private settingsServices: SettingsServices) {}

  onChangeTemperatureSwitch (value: boolean) {
    console.log(`event ${value}`)

    if (value) {
      this.settingsServices.temperatureUnitSubject.next(TemperatureUnit.cel)
    } else {
      this.settingsServices.temperatureUnitSubject.next(TemperatureUnit.fahr)
    }
  }

  onChangeSpeedSwich (value: boolean) {
    console.log(`event ${value}`)

    if (value) {
      this.settingsServices.speedUnitSubject.next(SpeedUnit.kmph)
    } else {
      this.settingsServices.speedUnitSubject.next(SpeedUnit.mph)
    }
  }
}

