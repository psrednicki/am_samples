import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {AmFeature} from "@acaisoft/angular-azure-maps/src/azure-map/interfaces/am-feature";
import {dataMock} from "../../data";
import {KeyService} from "../Utils/key.service";
import PinLayerOptions = Models.deprecated.PinLayerOptions;
import SymbolLayerOptions = Models.SymbolLayerOptions;
import Layer = atlas.layer.Layer;

@Component({
  selector: 'app-simple-pin',
  templateUrl: './simple-pin.component.html',
  styleUrls: ['./simple-pin.component.css']
})
export class SimplePinComponent implements OnInit, OnDestroy {

  @ViewChild('maper') maper: AtlasMapComponent;

  config: any = {
    'zoom': 1.5,
    'center': [-20,20],
    'interactive': true,
  };
  key: string = '';
  featuresArray: AmFeature[] = [];


  constructor(private mapService: LoadMapService,
              private keyService: KeyService) {
  }


  ngOnInit() {
    /**
     * You need add your key go display map or use API
     */
    this.key = this.keyService.getKey();

    /**
     * That way to lazy load map
     */

    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }

  getPos($event) {
    console.log('GEOCORDS: ', $event)
  }

  initPoint() {
    dataMock.forEach(value => {
      console.log(value)
      this.featuresArray.push(this.mergeDataPoint(value))
    });
    this.maper.createPoints(this.featuresArray);
    console.log('Thats your features Array: ', this.featuresArray)
    this.maper.createPopups(this.featuresArray);
  }

  init() {
    this.initPoint();
    this.addLayer();
  }

  updatePoints() {
    this.maper.updatePoints(this.featuresArray)
    this.addLayer();
  }

  removePoints() {
     this.maper.map.layers.remove(this.maper.findUniqueLayers(this.featuresArray));

  }

  addLayer() {
    console.log('Featires array',this.featuresArray)
    console.log('Featires array',    this.maper.findUniqueLayers(this.featuresArray));
    this.maper.findUniqueLayers(this.featuresArray).forEach(value => {
      console.log('VALUE', value)
      let lay = new atlas.layer.SymbolLayer(value);
      console.log('lay', lay)
      this.maper.map.layers.add(lay);
    });
  }


  dataPointsInit(data): atlas.data.Feature<any, any> {
    /**
     * Azure notation of position: [LONGITUDE, LATITUDE] [-180, 180] [-90, 90]
     * @type atlas.data.Position
     */
    const pos = new atlas.data.Position(data.localization.lng, data.localization.lnt);
    const point = new atlas.data.Point(pos);
    let icon = 'pin-red'
    if(data.type === 'Office')
    {
      icon = 'pin-blue'
    }
    const feature = new atlas.data.Feature(point, {
      icon: icon,
      name: data.name,
      type: data.type,
      title: data.name,
    });
    return feature;
  }

  dataLayerOptions(item): SymbolLayerOptions {
    const pinOptions: SymbolLayerOptions = {
      source: item,
      textOptions: {
        offset: [100, 46],
        font: ['SegoeUi-Bold'],
        ignorePlacement: true
      }

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
    console.log(atlas)
    console.log('MAPI', this.maper)
    this.maper.map.dispose()
  }




}
