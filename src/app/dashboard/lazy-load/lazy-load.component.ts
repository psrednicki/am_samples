import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {KeyService} from "../Utils/key.service";

@Component({
  selector: 'app-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.css']
})
export class LazyLoadComponent implements OnInit, OnDestroy {


  @ViewChild('maper') maper: AtlasMapComponent;
  // key is nessecary to show your map
  key: string = '';

  constructor(public mapService: LoadMapService,
              private keyService: KeyService) {
  }

  ngOnInit() {
    this.key = this.keyService.getKey();
    // that will lazy loaded azure map script and styles
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }

  getInfo() {
    // Check what atlas have
    console.log('ATLAS:', atlas);
  }

  ngOnDestroy(): void {
    this.maper.map.remove()
  }

}
