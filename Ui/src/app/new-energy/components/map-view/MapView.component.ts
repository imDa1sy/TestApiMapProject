import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteOwnerService } from '../waste-owner/WasteOwner.service';
import { MapViewService } from './MapView.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { WasteDataEntryService } from '../waste-data-entry/WasteDataEntry.service';
import { DialogEditWasteDataEntry } from '../waste-data-entry/DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';
import { WasteDataEntry, WasteData } from '../waste-data-entry/WasteDataEntry.class';
import { DialogDeleteQuestionComponent } from '../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { AgmMap, LatLngBounds } from '@agm/core';
import { AgmMarkerCluster } from '@agm/js-marker-clusterer';
import {OverlappingMarkerSpiderfier} from 'ts-overlapping-marker-spiderfier'
import { WasteTypeService } from '../waste-type/Wastetype.service';
import { WasteType, WasteTypeSearch, WasteTypeFilter } from '../waste-type/WasteType.class';
import { Http, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../restConfig';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-MapView',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css']
})
export class MapViewComponent implements OnInit {

  gMap: google.maps.Map;
 // activeLocationsList: Location[];
  activeWasteData: WasteData[];
  localOwnerLocations = [];
  latitude: number = 46.98647344584873;
  longitude: number = 28.861747553664827;
  zoom: number = 8;

  filterData:WasteTypeFilter;
  
  dataSource = new MatTableDataSource();

  markerSpiderfier: OverlappingMarkerSpiderfier;
  iw : google.maps.InfoWindow;
  markerCluster: any;

  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;
  @ViewChild('AgmMap') agmMap: AgmMap;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _wasteOwnerService: WasteOwnerService,
    private changeDetectorRefs: ChangeDetectorRef,
    
    public dialog: MatDialog,
    private authService: AuthService,
    private _mapViewService: MapViewService,
    private _wasteDataEntryService: WasteDataEntryService,
    private _wasteTypeService: WasteTypeService, 
    private http:Http
    ) {
      this.filterData = new WasteTypeFilter();
    //check  role and display table based on role
    this.authService.setRole.subscribe((value) => {
      this.ROLE = value;
      if (value == 'ROLE_WASTE_USER') {
        this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
          'validityDate', /*'actionsColumn'*/];
      }
      if (value == 'ROLE_ADMIN' || value == 'ROLE_CONTENT_MNGR') {
        this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
          'validityDate', 'actionsColumn'];
      }
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   

  }
  


  ngOnInit() {
    // fill filter form with all waste types
    // call backend
    this._wasteTypeService.loadAllActiveWasteTypes().subscribe( data => {
        // the data contains all the waste types
        // iterate and put into our filterData.wasteTypeSearch array
        for (const iterationWasteType of data) {
          // create new instance of wasteTypeSearch
          var tempWasteTypeSearch = new WasteTypeSearch();
          // fill the wasteTypeSearch form WasteType got from iterator
          tempWasteTypeSearch.copyFromWasteType(iterationWasteType);
          // push the temp instance into our filterData.wasteTypeSearch array
          this.filterData.wasteTypeSearch.push(tempWasteTypeSearch);
         }
      });

      // now wait for the map to be ready for using
      this.agmMap.mapReady.subscribe(map => {       
        // ready...so get the map into our global variable
        console.log('map is ready')
        this.gMap=map;
        this.markerSpiderfier = new OverlappingMarkerSpiderfier(map, {keepSpiderfied:true});

        // initialize information window for showing on click data of waste data
        this.iw = new google.maps.InfoWindow();

        // then add the click event for our spiderfier to show information window
        this.markerSpiderfier.addListener('click', (marker)=> {
          this.iw.setContent(marker.title);
          this.iw.open(map, marker);
        });

        
        // and add a event listener for changing the center
        google.maps.event.addListener(map, 'center_changed', ()=> { 
            this.GetMapBounds();
            this.fillMap(this.gMap);
        });

            // and finally create the cluster for the markers
        this.markerCluster = new MarkerClusterer(map, [],
          {gridSize: 20,
          maxZoom: 14,
          zoomOnClick: true, 
          imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m'
        });
        
        // now fill our map
        this.fillMap(map);

      });
 }


// this method load all waste date
loadAllactiveWasteData(filter: WasteTypeFilter) {
  // call the backend service to get all the data
  this.Log( 'getting data from backend')
  this._wasteDataEntryService.loadAllActiveWasteData(filter).subscribe(data => {
  this.Log('data loaded ' + data )
  this.activeWasteData = data;
  this.dataSource.data = this.activeWasteData;
  this.DrawMarkers(this.gMap);
  });
  this.changeDetectorRefs.detectChanges();
}

// filter started from map
FilterSearch(){
  this.fillMap(this.gMap);
}

// get bounds and put into filteddata 
GetMapBounds(){
  if ( (this.filterData) && (this.gMap.getBounds()) ){
    this.filterData.NElon= this.gMap.getBounds().getNorthEast().lng();
    this.filterData.NElat= this.gMap.getBounds().getNorthEast().lat();
    this.filterData.SWlon= this.gMap.getBounds().getSouthWest().lng();
    this.filterData.SWlat= this.gMap.getBounds().getSouthWest().lat();
  }
}

fillMap( map ){
    // get some parameters from map (long lat bounds)
    this.GetMapBounds();
    //load all active waste data
    this.Log( 'fill map');
    this.Log( this.filterData);
    this.loadAllactiveWasteData(this.filterData);
}

DrawMarkers(map){
    // prepare temp markers
    var markers = [];

    // init spider objects
    this.markerSpiderfier.removeAllMarkers();
    this.markerCluster.clearMarkers();

    // iterate to all data got from backend and put into map
    for (const iterationWasteData of this.activeWasteData) {
      
      var latLng = new google.maps.LatLng(iterationWasteData.location.latitude,
          iterationWasteData.location.longitude);

      // TODO summing up

      var marker = new google.maps.Marker({
        position: latLng,
        map: map
        });

      // set marker title
      // TODO: need better solution
      marker.title = '<strong>' + iterationWasteData.wasteOwnerData.name + ' ' +  iterationWasteData.wasteOwnerData.surName + '</strong>'

      marker.title = 
      '<table><tr><td>Waste owner: '+
      '<strong>'+iterationWasteData.wasteOwnerData.name+' ' + iterationWasteData.wasteOwnerData.surName+'</strong>'+
      '</td></tr>'+
      '<tr><td>Location: '+
      '<strong>'+iterationWasteData.location.description+'</strong>'+
      '</td></tr>'+
      '<tr><td>Waste Type: '+
      '<strong>'+iterationWasteData.wasteType.wasteType+'</strong>'+
      '</td></tr>'+
      '<tr><td>Amount: '+
      '<strong>'+iterationWasteData.wasteDataEntry.amount+'</strong>'+
      '</td></tr>'+    
      '<tr><td> Valid from: <strong>';

      if (!iterationWasteData.wasteDataEntry.validityDateStart ){
        marker.title += '-';
      } else {        
      marker.title += new Date( iterationWasteData.wasteDataEntry.validityDateStart).toDateString();
      }
      marker.title += ' </strong> to <strong>';

      if (!iterationWasteData.wasteDataEntry.validityDateEnd ){
        console.log('null end');
        marker.title += '-';
      } else {
        marker.title += new Date( iterationWasteData.wasteDataEntry.validityDateEnd).toDateString();
      }
      marker.title += '</strong></td></tr></table>';
      
      // push marker into temp array
      markers.push(marker);      
      
      // add all markers to the spiderfier 
      this.markerSpiderfier.addMarker(marker,  function(marker) {console.log('neki klick')});  // Adds the Marker to OverlappingMarkerSpiderfier
    };

    this.markerCluster.addMarkers(markers);

}


Log(data){
  console.log( data );
}
 
 
  editWasteData(elementData) {
    let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
      // disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px',
      data: {
        "id": elementData.wasteDataEntry.id,
        "localWasteDataEntry": WasteDataEntry,
        "edit": true,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.loadAllactiveWasteData(this.filterData);
      }
    });
  }

  deleteWasteData(id) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "Waste data", "restName": "/api/removewastedata/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.loadAllactiveWasteData(this.filterData);
      }
    });
  }


}
