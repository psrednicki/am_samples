import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {animate} from "@angular/animations";
import {timestamp} from "rxjs/operators";
import {KeyService} from "../Utils/key.service";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit, OnDestroy {

  @ViewChild('maper') maper: AtlasMapComponent;
  // key is nessecary to show your map
  key: string = '';
  activeIntervals: any[] = [];
  markerCounter: number = 0;
  pinCounter: number = 0;

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

  addMarker() {
      //Create a HTML marker and add it to the map.
      let marker = new atlas.HtmlMarker({
        htmlContent: '<image class="element"  src="../../../assets/eye-crossed.svg"/>',
        position: this.randomCoords()
      });
      this.maper.map.markers.add(marker);
      //Start the animation.
      this.activeIntervals.push(setInterval(() => {
        this.animateMarker(new Date().getTime(), marker)
      }, 30))
    this.markerCounter++;
  }

  animateMarker(timestamp, marker) {
      marker.setOptions({
        position: this.positionOnCircle(timestamp/1000, 20)
      })
  }

  addHtml() {
    this.createPoint()
  }

  createPoint() {
    const datasource = new atlas.source.DataSource();
    this.maper.map.sources.add(datasource);
    //Create a layer that defines how to render the shapes in the data source and add it to the map.
    this.maper.map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
      source: datasource,
      iconOptions: {
        allowOverlap: true    //To ensure smooth rendering when animating, allow symbol to overlap all other symbols on the map.
      }
    }));
    //Create a pin and wrap with the shape class and add to data source.
    let pin = new atlas.Shape(new atlas.data.Point(this.randomCoords()));
    datasource.add(pin);

    this.activeIntervals.push(setInterval(() => {
      this.animate(new Date().getTime(), pin)
    }, 30))

    this.pinCounter++;
  }

  randomCoords(): atlas.data.Position {
    return new atlas.data.Position(Math.floor(Math.random() * 80) + 4 , Math.floor(Math.random() * 30) + 1 )
  }

  animate(timestamp, pin) {
    pin.setCoordinates(this.positionOnCircle(timestamp/1000, 30))
  }

  removeIntevals() {
    this.activeIntervals.forEach((it) => {
      clearInterval(it);
    })
    this.markerCounter = 0;
    this.pinCounter = 0;
  }

  positionOnCircle(angle, radius) {
    //Calculate the position on a circle for an angle of animation.
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    ];
  }

  ngOnDestroy(): void {
    this.maper.removeMap()
  }


}
