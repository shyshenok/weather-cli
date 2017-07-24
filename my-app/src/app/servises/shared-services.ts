/**
 * Created by shyshenok on 13.07.17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class SharedService {
  citySubject: Subject<string> = new ReplaySubject(1);
  backgroundSubject: Subject<string> = new ReplaySubject(1);
}
