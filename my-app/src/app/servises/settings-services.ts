/**
 * Created by shyshenok on 03.08.17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export enum TemperatureUnit {cel, fahr};
export enum SpeedUnit {kmph, mph};

@Injectable()
export class SettingsServices {
  temperatureUnitSubject: Subject<TemperatureUnit> = new ReplaySubject(1);
  speedUnitSubject: Subject<SpeedUnit> = new ReplaySubject(1);

}
