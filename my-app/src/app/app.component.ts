import {Component, OnInit} from '@angular/core';
import {SharedService} from './servises/shared-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  backgroundPicture: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.backgroundSubject.subscribe(background => {
      console.log(`New background: ${background}`);
      this.backgroundPicture = background;
    });
  }
}
