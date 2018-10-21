import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {KeyService} from "../Utils/key.service";

@Component({
  selector: 'app-current-position',
  templateUrl: './current-position.component.html',
  styleUrls: ['./current-position.component.css']
})
export class CurrentPositionComponent implements OnInit, OnDestroy {

  @ViewChild('maper') maper: AtlasMapComponent;

  key: string = '';

  constructor(public mapService: LoadMapService,
              private keyService: KeyService) {
  }

  ngOnInit() {
    this.key = this.keyService.getKey();
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }



  getPos() {
    console.log(this.maper.map)
    console.log(atlas)
      navigator.geolocation.getCurrentPosition((position) => {
          //Create a data source and add it to the map.
           console.log('Position', position)
          const datasource = new atlas.source.DataSource();
          this.maper.map.sources.add(datasource)
          const userPosition = new atlas.data.Position(position.coords.longitude, position.coords.latitude);
          const userPoint = new atlas.data.Point(userPosition);
          //Add a point feature with Circle properties to the data source for the users position. This will be rendered as a polygon.
          datasource.add(new atlas.data.Feature(userPoint, {
            subType: "Circle",
            radius: position.coords.accuracy,
          }));
          //Add the users position point.
          datasource.add(userPoint);
          this.maper.map.layers.add([
            //Create a polygon layer to render the filled in area of the accuracy circle for the users position.
            new atlas.layer.PolygonLayer(datasource, null, {
              source: datasource,
              fillColor: 'rgba(0, 153, 255, 0.5)'
            }),
            //Create a symbol layer to render the users position on the map.
            new atlas.layer.SymbolLayer(datasource, null, {
              source: datasource,
              filter: ['==', '$type', 'Point']
            })
          ]);
          //Center the map on the users position.
          this.maper.map.setCamera({
            center: userPosition,
            zoom: 15,
            type: 'fly',
            duration: 3000

          });

      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Position information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('The request to get user position timed out.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
      })
  }

  ngOnDestroy(): void {
    this.maper.removeMap()
  }
}
