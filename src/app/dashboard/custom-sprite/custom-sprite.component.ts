import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {AmFeature} from "@acaisoft/angular-azure-maps/src/azure-map/interfaces/am-feature";
import {dataSprite} from "../../data";
import {Observable} from "rxjs/internal/Observable";
import {debug} from "util";
import {KeyService} from "../Utils/key.service";
import PinLayerOptions = Models.deprecated.PinLayerOptions;

@Component({
  selector: 'app-custom-sprite',
  templateUrl: './custom-sprite.component.html',
  styleUrls: ['./custom-sprite.component.css']
})
export class CustomSpriteComponent implements OnInit, OnDestroy {

  @ViewChild('maper') maper: AtlasMapComponent

  config: any = {
    'zoom': 1.5,
    'center': [-20, 20],
    'interactive': true,
    'style': 'grayscale_dark'
  };
  key: string = '';
  featuresArray: AmFeature[] = [];


  constructor(public mapService: LoadMapService,
              private keyService: KeyService) {
  }


  ngOnInit() {

    // Key its necessary to get response from AzureMap API
    this.key = this.keyService.getKey();
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

  /**
   * If you want to add data when map is inicialed
   * Use that mapLoaded to avoid errors
   */
  mapLoaded() {
    /**
     * Before add image Spirte, you need to load it
     */
    Promise.all([
      // Add sprite to map as icon
      this.maper.map.imageSprite.add('my-pin', '../../../assets/eye-crossed.svg'),
      this.maper.map.imageSprite.add('git', '../../../assets/github-small.svg')
    ]).then((e) => {
      this.initPoint();
    })
  }


  removeSprite() {
    this.maper.map.layers.remove(this.maper.findUniqueLayers(this.featuresArray))
  }

  initPoint() {
    dataSprite.forEach(value => {
      this.featuresArray.push(this.mergeDataPoint(value))
    });
    this.maper.createPoints(this.featuresArray);
    console.log('Thats your features Array: ', this.featuresArray)
    this.maper.createPopups(this.featuresArray);
  }

  dataPointsInit(data): atlas.data.Feature<any, any> {
    /**
     * Azure notation of position: [LONGITUDE, LATITUDE] [-180, 180] [-90, 90]
     * @type atlas.data.Position
     */
    const pos = new atlas.data.Position(data.localization.lng, data.localization.lnt);
    const point = new atlas.data.Point(pos);
    let icon = 'my-pin'
    if (data.type === 'GH') {
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

  ngOnDestroy(): void {
    this.maper.map.remove()
  }


}
