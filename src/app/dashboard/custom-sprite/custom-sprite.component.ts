import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {AmFeature} from "@acaisoft/angular-azure-maps/src/azure-map/interfaces/am-feature";
import {dataSprite} from "../../data";
import {Observable} from "rxjs/internal/Observable";
import {debug} from "util";

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
  };
  key: string = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
  featuresArray: AmFeature[] = [];
  isFirst: boolean = true;


  constructor(public mapService: LoadMapService) {
  }


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

  /**
   * If you want to add data when map is inicialed
   * Use that mapLoaded to avoid errors
   */
  mapLoaded() {
    // Check if ViewChild is correctly init
    if (this.maper && this.mapService.isLoaded) {
      // use that function to load sprites to map
      this.maper.map.events.add('load', (e) => {
        Promise.all([
          // Add sprite to map as icon
          this.maper.map.imageSprite.add('my-pin', '../../../assets/eye-crossed.svg'),
          this.maper.map.imageSprite.add('git', '../../../assets/github-small.svg')
        ]).then((e) => {
          this.isFirst = false;
          this.initPoint();
        })
      })
    } else {
      setTimeout(() => this.mapLoaded(), 400)
    }

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
