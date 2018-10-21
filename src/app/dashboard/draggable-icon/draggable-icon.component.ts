import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KeyService} from "../Utils/key.service";
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";

@Component({
  selector: 'app-dragable-icon',
  templateUrl: './draggable-icon.component.html',
  styleUrls: ['./draggable-icon.component.css']
})
export class DraggableIconComponent implements OnInit, OnDestroy {


  @ViewChild('maper') maper: AtlasMapComponent;
  // key is nessecary to show your map
  key: string = '';
  int: number = 0;

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

  mapLoaded() {
    this.addImgMarker()
  }

  addImgMarker() {
    this.maper.map.markers.add(new atlas.HtmlMarker({
      draggable: true,
      htmlContent: '<img src="../../../assets/coffepin.png" style="width:50px;height:50px;"/>',
      position: [0, 0],
      pixelOffset: [10, 10],
    }))
  }

  addDIVmarker() {
    this.maper.map.markers.add(new atlas.HtmlMarker({
      draggable: true,
      htmlContent: '<div class="lds-circle"></div>',
      position: [0, 0],
      // pixelOffset:[10, 10],
    }))
  }


  getInfo() {
    // Check what atlas have
    console.log('ATLAS:', atlas);
  }

  ngOnDestroy(): void {
    this.maper.map.dispose()
    clearInterval(this.int)
  }

}
