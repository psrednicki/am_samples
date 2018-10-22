import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KeyService} from "../Utils/key.service";
import {AtlasMapComponent, LoadMapService} from "@acaisoft/angular-azure-maps";
import {bind} from "@angular/core/src/render3/instructions";
import MapMouseEvent = Models.MapMouseEvent;

@Component({
  selector: 'app-custom-pin',
  templateUrl: './custom-pin.component.html',
  styleUrls: ['./custom-pin.component.css']
})
export class CustomPinComponent implements OnInit, OnDestroy {


  @ViewChild('maper') maper: AtlasMapComponent;
  // key is nessecary to show your map
  key: string = '';
  popup: atlas.Popup;
  popupHtml: atlas.Popup;

  config: any = {
    'zoom': 1,
    'center': [-20, 20],
    'interactive': true,
    'style': 'grayscale_dark'
  }

  constructor(public mapService: LoadMapService,
              private keyService: KeyService) {
  }

  ngOnInit() {
    // Key its necessary to get response from AzureMap API
    this.key = this.keyService.getKey();
    // that will lazy loaded azure map script and styles
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key);
    })
  }

  mapLoaded() {
    console.log('LAOEDED', this)
    this.initPoint();
    this.initMarker()
  }

  initPoint() {
    let datasource = new atlas.source.DataSource(null, {
      cluster: false
    });
    this.maper.map.sources.add(datasource);
    //Create three point features on the map and add some metadata in the properties which we will want to display in a popup.
    const point1 = new atlas.data.Feature(new atlas.data.Point([-33, 47]), {
      name: 'Point 1 Title',
      description: 'This is the description 1.'
    });
    const point2 = new atlas.data.Feature(new atlas.data.Point([-122, 45]), {
      name: 'Point 2 Title',
      description: 'This is the description 2.'
    });
    const point3 = new atlas.data.Feature(new atlas.data.Point([-12, 47.635]), {
      name: 'Point 3 Title',
      description: 'This is the description 3.'
    });
    const point4 = new atlas.data.Feature(new atlas.data.Point([14, 23.8]), {
      name: 'Point 4 Title',
      description: 'This is the description 4.'
    });
    //Created Feature Collection
    let featureCollection = new atlas.data.FeatureCollection([point1, point2, point3, point4]);

    //Add the symbol to the data source.
    datasource.add(featureCollection);

    //Add a layer for rendering point data as symbols.
    var symbolLayer = new atlas.layer.SymbolLayer(datasource, '', {
      source: 'jaj',
      iconOptions: {
        allowOverlap: true,
        ignorePlacement: true,
        optional: true,
        image: 'pin-round-blue',
      },
      textOptions: {
        allowOverlap: true,
        textField: ['get', 'name'],
        offset: [0, 1],
        color: '#FFFFFF'
      }
    });
    this.maper.map.layers.add(symbolLayer);
    //Create a popup but leave it closed so we can update it and display it later.
    this.popup = new atlas.Popup({
      position: [0, 0],
      pixelOffset: [0, -18]
    });
    //Created Popup
    this.popup = new atlas.Popup({
      position: [0, 0]
    });
    //Add a click event to the symbol layer.
    this.maper.map.events.add('click', symbolLayer, (e: any) => {
      console.log(e)
      if (e.shapes && e.shapes.length > 0) {

        this.popup.isOpen() ? this.popup.close() : null;
        let properties = e.shapes[0].getProperties();
        //By default, show the popup where the mouse event occured.
        let pos = e.position;
        let offset = [0, 0];
        //If the shape is a point feature, show the popup at the points coordinate.
        if (e.shapes[0].getType() === 'Point') {
          pos = e.shapes[0].getCoordinates();
          offset = [0, -18];
        }
        this.popup = new atlas.Popup({
          position: e.shapes[0].getCoordinates(),
          content: '<div style="padding:10px;max-height:200px;overflow-y:auto;">' + properties.name + '</div>',
        })

        this.popup.setOptions({
          pixelOffset: [0, -18]
        });
        this.popup.open(e.map);
      }
    });
  }

  initMarker() {

    let dataHtmlSources = new atlas.source.DataSource()

    this.popupHtml = new atlas.Popup({
      content: '<div class="pop_container">POP</div>'
    });
    //Create a HTML marker and add it to the map.
    let marker = new atlas.HtmlMarker({
      htmlContent: '<span class="pulse" id="mark"></span>',
      position: [10, 10],
      popup: this.popupHtml
    });
    this.maper.map.markers.add(marker);
   // marker.togglePopup()
    document.getElementById('mark').addEventListener("click", () => {
      marker.togglePopup()
    })

  }



  /**
   * Official example
   */
  // symbolClicked(e) {
  //   //Make sure the event occured on a point feature.
  //   if (e.shapes && e.shapes.length > 0) {
  //     console.log('THATS IT:', e)
  //     let content, coordinate;
  //     //Check to see if the first value in the shapes array is a Point Shape.
  //     if (e.shapes[0] instanceof atlas.Shape && e.shapes[0].getType() === 'Point') {
  //       let properties = e.shapes[0].getProperties();
  //       content = this.popupTemplate.replace(/{{name}}/g, properties.name).replace(/{{description}}/g, properties.description);
  //       coordinate = e.shapes[0].getCoordinates();
  //     } else if (e.shapes[0].type === 'Feature' && e.shapes[0].geometry.type === 'Point' && e.shapes[0].properties.cluster) {
  //       //Check to see if the feature is a cluster.
  //       if (e.shapes[0].properties.cluster) {
  //         content = '<div style="padding:10px;">Cluster of ' + e.shapes[0].properties.point_count + ' symbols</div>';
  //       } else {
  //         //Feature is likely from a VectorTileSource.
  //         content = this.popupTemplate.replace(/{name}/g, e.shapes[0].properties.name).replace(/{description}/g, e.shapes[0].properties.description);
  //       }
  //
  //       coordinate = e.shapes[0].geometry.coordinates;
  //     }
  //     if (content && coordinate) {
  //       //Populate the popupTemplate with data from the clicked point feature.
  //       this.popup.setPopupOptions({
  //         //Update the content of the popup.
  //         content: content,
  //         //Update the position of the popup with the symbols coordinate.
  //         position: coordinate
  //       });
  //       //Open the popup.
  //       this.popup.open(this.maper.map);
  //     }
  //   }
  // }

  getInfo() {
    // Check what atlas have
    console.log('ATLAS:', atlas);
  }

  ngOnDestroy(): void {
    this.maper.removeMap();
  }

}
