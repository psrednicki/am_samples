import {Component, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {AmFeature} from "@acaisoft/angular-azure-maps/src/azure-map/interfaces/am-feature";
import {dataSprite} from "../../data";

@Component({
  selector: 'app-custom-sprite',
  templateUrl: './custom-sprite.component.html',
  styleUrls: ['./custom-sprite.component.css']
})
export class CustomSpriteComponent implements OnInit {

  @ViewChild('maper') maper: AtlasMapComponent;

  config: any = {
    'zoom': 1.5,
    'center': [-20,20],
    'interactive': true,
  };
  key: string = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
  featuresArray: AmFeature[] = [];


  constructor(public mapService: LoadMapService) { }


  ngOnInit() {
    // script and styles loaded
    this.mapService.load().toPromise().then(() => {
      // set key
      atlas.setSubscriptionKey(this.key);
    })
  }

  getPos($event) {
    // emitting geopostion
    console.log('GEOCORDS: ', $event)
  }

  init() {
    this.initPoint()
  }

  addSprite() {
    // Add sprite to map as icon
    this.maper.map.imageSprite.add('my-pin', '../../../assets/eye-crossed.svg')
    this.maper.map.imageSprite.add('git', '../../../assets/github-small.svg').then(()=> {
      this.init()
    })
  }

  removeSprite() {
    this.maper.map.removeLayers(this.maper.findUniqueLayers(this.featuresArray))
  }

  initPoint() {
    dataSprite.forEach(value => {
      this.featuresArray.push(this.mergeDataPoint(value))
    });
    this.maper.createPoints(this.featuresArray);
    console.log('Thats your features Array: ', this.featuresArray)
    this.maper.createPopups(this.featuresArray);
  }

  dataPointsInit(data): atlas.data.Feature {
    /**
     * Azure notation of position: [LONGITUDE, LATITUDE] [-180, 180] [-90, 90]
     * @type atlas.data.Position
     */
    const pos = new atlas.data.Position(data.localization.lng, data.localization.lnt);
    const point = new atlas.data.Point(pos);
    let icon = 'my-pin'
    if(data.type === 'GH')
    {
      icon = 'git'
    }
    const feature = new atlas.data.Feature(point, {
      icon: icon,
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
      textOffset: [0, 25],
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
