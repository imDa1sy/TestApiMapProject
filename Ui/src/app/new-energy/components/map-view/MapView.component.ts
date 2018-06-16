import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteOwnerService } from '../waste-owner/WasteOwner.service';
import { MapViewService } from './MapView.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { WasteDataEntryService } from '../waste-data-entry/WasteDataEntry.service';
import { DialogEditWasteDataEntry } from '../waste-data-entry/DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';
import { WasteDataEntry, WasteData, WasteDataTypeSum, VolumeToPower } from '../waste-data-entry/WasteDataEntry.class';
import { DialogDeleteQuestionComponent } from '../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { AgmMap, LatLngBounds } from '@agm/core';
import { AgmMarkerCluster } from '@agm/js-marker-clusterer';
import {OverlappingMarkerSpiderfier} from 'ts-overlapping-marker-spiderfier'
import { WasteTypeService } from '../waste-type/Wastetype.service';
import { WasteType, WasteTypeSearch, WasteTypeFilter } from '../waste-type/WasteType.class';

import { restConfig } from '../restConfig';
import { TranslateLangService } from '../../TranslateLangService.service';
import { TranslateService } from '@ngx-translate/core';



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
  lastevent: Date = new Date();
  
  dataSource = new MatTableDataSource(); //grid view data source
  energyviewSource = new MatTableDataSource(); //energy view data source

  markerSpiderfier: OverlappingMarkerSpiderfier;
  iw : google.maps.InfoWindow;
  markerCluster: any;
  gasVolume: number = 0;
  kw: number = 0;
  // refresh timer for map backend calling
  refreshTimer: any;
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = []; //grid view displayed columns
  displayedEnergyViewColumns = [];

  // summed waste type data for energy tab
  EnergyData: WasteDataTypeSum[] = [];




  ROLE: string;
  Language= 'en';

  @ViewChild('AgmMap') agmMap: AgmMap;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('energyViewTable', {read: MatPaginator}) energyViewPaginator : MatPaginator;

  constructor(private _wasteOwnerService: WasteOwnerService,
    private changeDetectorRefs: ChangeDetectorRef,
    private translate: TranslateService,
    public dialog: MatDialog,
    private authService: AuthService,
    private _mapViewService: MapViewService,
    private _wasteDataEntryService: WasteDataEntryService,
    private _wasteTypeService: WasteTypeService, 
    private _translateServiceLang : TranslateLangService
    ) {
      this.Language= this._translateServiceLang.currentLanguageActive;
      this.filterData = new WasteTypeFilter();
    //check  role and display table based on role
    this.authService.setRole.subscribe((value) => {
      this.ROLE = value;
      if (value == 'ROLE_WASTE_USER') {
           //here we set grid view table columns if role waste user dont show action buttons
        this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
          'validityDate', /*'actionsColumn'*/];

           //here we set energy view table columns 
        this.displayedEnergyViewColumns =['wasteType','sumAmount','count'];  
      }
      if (value == 'ROLE_ADMIN' || value == 'ROLE_CONTENT_MNGR') {
          //here we set energy view table columns
        this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
          'validityDate', 'actionsColumn'];

          //here we set energy view table columns
          this.displayedEnergyViewColumns =['wasteType','sumAmount','count',];
      }
    });
    
  }

  ngAfterViewInit() {
    //add paginator to grid view table
    this.dataSource.paginator = this.paginator;
    //add paginator to energy view table
    this.energyviewSource.paginator = this.energyViewPaginator;
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

        /* removed by idle event
        // and add a event listener for changing the center
        google.maps.event.addListener(map, 'center_changed', ()=> { 
           // this.StartTimer();
        });
        */ 

        google.maps.event.addListener(map, 'idle', ()=> { 
          this.LoadMarkersDelayed();
        });

            // and finally create the cluster for the markers
        this.markerCluster = new MarkerClusterer(map, [],
          {gridSize: 20,
          maxZoom: 13,
          zoomOnClick: true, 
          imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m'
        });
        
        // now fill our map
        this.fillMap(map);

      });
 }


 LoadMarkersDelayed(){
  this.Log('delayed started')
  clearTimeout(this.refreshTimer);
  this.refreshTimer = setTimeout(()=>{this.LoadMarkers()}, 1000);

}

LoadMarkers(){
    this.Log('load started');
    this.Log('started to fill')
    this.fillMap(this.gMap);
  
};
  

// this method load all waste date
loadAllactiveWasteData(filter: WasteTypeFilter) {
  // call the backend service to get all the data
  this.Log( 'getting data from backend')
  this._wasteDataEntryService.loadAllActiveWasteData(filter).subscribe(data => {
  //this.Log('data loaded ' + data )
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
   // this.Log( 'fill map');
    //this.Log( this.filterData);
    
    this.loadAllactiveWasteData(this.filterData);
}

DrawMarkers(map){
    // prepare temp markers
    var markers = [];
    this.EnergyData = [];

    // fill the energy data with filterData.wasteTypeSearch so we have the same order as in the selection
    for (const iterator of this.filterData.wasteTypeSearch) {
      var tempwasteDataTypeSum = new WasteDataTypeSum();
      tempwasteDataTypeSum.wasteType = iterator;
      tempwasteDataTypeSum.sumAmount = 0;
      tempwasteDataTypeSum.count = 0;
      this.EnergyData.push(tempwasteDataTypeSum);  
      
    }
    // reset gas volume
    this.gasVolume = 0;
    this.kw = 0;


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
        icon : this.markerColor(iterationWasteData.wasteType.color), //here is marker filled with custom color
        map: map
        });

      // set marker title
      // TODO: need better solution
      marker.title = '<strong>' + iterationWasteData.wasteOwnerData.name + ' ' +  iterationWasteData.wasteOwnerData.surName + '</strong>'

      marker.title = 
      '<table><tr><td>'+this.translate.instant('new_energy-waste-owner-header') +':' +
      '<strong>'+iterationWasteData.wasteOwnerData.name+' ' + iterationWasteData.wasteOwnerData.surName+'</strong>'+
      '</td></tr>'+
      '<tr><td>'+this.translate.instant('new_energy-location') +':'+
      '<strong>'+iterationWasteData.location.description+'</strong>'+
      '</td></tr>'+
     
      '<tr><td>'+this.translate.instant('new_energy-waste-type-header') +':' +'<strong>';
      if(this.Language == 'en'){
        marker.title += iterationWasteData.wasteType.wasteType.en;
      } if(this.Language == 'ro'){
        marker.title += iterationWasteData.wasteType.wasteType.ro;
      }
      marker.title +='</strong></td></tr>'+

      '<tr><td>'+this.translate.instant('new_energy-amount') +':' +
      '<strong>'+iterationWasteData.wasteDataEntry.amount+ ' kg'+'</strong>'+
      '</td></tr>'+    
      '<tr><td>'+this.translate.instant('new_energy-valid-from') +': <strong>';

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
      

      // calculation
      this.gasVolume += iterationWasteData.wasteDataEntry.amount/1000 * iterationWasteData.wasteType.factor; 
      this.kw += VolumeToPower( this.gasVolume );
      console.log(this.gasVolume);

      // if in EnergyData we do not have an entry with the waste type
      // add it into the array
      let nIndex = this.EnergyData.findIndex(
         tempwasteDataTypeSum => tempwasteDataTypeSum.wasteType.id == iterationWasteData.wasteType.id ) ;

      if ( nIndex == -1 ) {
        console.log('shold not happen!!!!!')
        var tempwasteDataTypeSum = new WasteDataTypeSum();
        tempwasteDataTypeSum.wasteType = iterationWasteData.wasteType;
        tempwasteDataTypeSum.sumAmount = iterationWasteData.wasteDataEntry.amount;
        tempwasteDataTypeSum.count = 1;
        this.EnergyData.push(tempwasteDataTypeSum);
      } else {
        console.log( 'found ' + nIndex);
        this.EnergyData[nIndex].sumAmount += iterationWasteData.wasteDataEntry.amount;
        this.EnergyData[nIndex].count ++;
      }

      // push marker into temp array
      markers.push(marker);      
      
      // add all markers to the spiderfier 
      this.markerSpiderfier.addMarker(marker,  function(marker) {console.log('neki klick')});  // Adds the Marker to OverlappingMarkerSpiderfier
    };
      //fill energy view data soruce
    this.energyviewSource.data = this.EnergyData;

    this.Log(this.EnergyData);
    this.markerCluster.addMarkers(markers);

}
// method markerColor fiil marker with custom color ion create markers
markerColor(color) {
  return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
 };
}


Log(data){
  console.log( data );
}
 
 
editWasteData(id) {
  let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
    // disableClose: true,
    autoFocus: true,
    width: '800px', height: '550px',
    data: {
      "id": id,
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
    data: { "text": this.translate.instant('new_energy-waste-dataEntry-data'), "restName": "/api/removewastedata/", "entity_id": id }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result != null) {
      this.loadAllactiveWasteData(this.filterData);
    }
  });
}


}
