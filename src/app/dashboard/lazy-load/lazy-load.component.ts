import {Component, OnInit} from '@angular/core';
import {LoadMapService} from "@acaisoft/angular-azure-maps";

@Component({
  selector: 'app-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.css']
})
export class LazyLoadComponent implements OnInit {

  // key is nessecary to show your map
  key: string = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';

  constructor(public mapService: LoadMapService) {
  }

  ngOnInit() {
    // that will lazy loaded azure map script and styles
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }

  getInfo() {
    // Check what atlas have
    console.log('ATLAS:', atlas);
  }

}
