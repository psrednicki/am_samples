import {Component, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {AmFeature} from "@acaisoft/angular-azure-maps/src/azure-map/interfaces/am-feature";

@Component({
  selector: 'app-simple-pin',
  templateUrl: './simple-pin.component.html',
  styleUrls: ['./simple-pin.component.css']
})
export class SimplePinComponent implements OnInit {

  @ViewChild('maper') maper: AtlasMapComponent;

  config: any = {
    'zoom': 1.5,
    'center': [-20,20],
    'interactive': true,
  };
  key: string = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
  featuresArray: AmFeature[] = [];

  data: any[] = [{
    name: 'DataCenter1',
    type: 'DataCenter',
    status: 'Online',
    localization:
      {
        lnt: 20,
        lng: 30
      }
  },{
    name: 'DataCenter2',
    type: 'DataCenter',
    status: 'Online',
    localization:
      {
        lnt: 50,
        lng: 10
      }
  },{
    name: 'DataCenter3',
    type: 'DataCenter',
    status: 'Offline',
    localization:
      {
        lnt: -20,
        lng: -30
      }
  },{
    name: 'Office',
    type: 'Office',
    status: 'over',
    localization:
      {
        lnt: -24.21,
        lng: -80.12
      }
  },{
    name: 'Head Ofice',
    type: 'DataCenter',
    status: 'in-work',
    localization:
      {
        lnt: 120,
        lng: 87
      }
  }]

  constructor(private mapService: LoadMapService) { }


  ngOnInit() {
    /**
     * Thats way to lazy load map
     */
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }

  getPos($event) {
    console.log('GEOCORDS: ', $event)
  }

  initPoint() {
    this.data.forEach(value => {
      this.featuresArray.push(this.mergeDataPoint(value))
    });
    this.maper.createPoints(this.featuresArray);
    console.log(this.featuresArray)
    this.maper.createPopups(this.featuresArray);
  }

  click() {
    this.initPoint()
  }


  dataPointsInit(data): atlas.data.Feature {
    const pos = new atlas.data.Position(data.localization.lnt, data.localization.lng);
    const point = new atlas.data.Point(pos);
    const feature = new atlas.data.Feature(point, {
      icon: 'pin-red',
      name: data.name,
      type: data.type,
      title: data.name,
    });
    return feature;
  }

  dataLayerOptions(item): PinLayerOptions {
    const pinOptions: PinLayerOptions = {
      name: item,
      textFont: 'SegoeUi-Bold',
      textOffset: [0, 17],
    };
    return pinOptions;
  }

  mergeDataPoint(data) {
    return {
      dataElement: data,
      atlasFeature: this.dataPointsInit(data),
      layer: data.type,
      pinConfig: this.dataLayerOptions(data.type)
    } as AmFeature
  }




}
