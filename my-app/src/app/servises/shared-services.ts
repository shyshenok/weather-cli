/**
 * Created by shyshenok on 13.07.17.
 */
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
 citySubject: Subject<string> = BehaviorSubject.create();
 backgroundSubject: Subject<string> = BehaviorSubject.create();

}
