import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteOwnerService } from '../waste-owner/WasteOwner.service';
import { MapViewService } from './MapView.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { WasteDataEntryService } from '../waste-data-entry/WasteDataEntry.service';
import { DialogEditWasteDataEntry } from '../waste-data-entry/DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';
import { WasteDataEntry } from '../waste-data-entry/WasteDataEntry.class';
import { DialogDeleteQuestionComponent } from '../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { AgmMap, LatLngBounds } from '@agm/core';

declare var google: any;
@Component({
  selector: 'app-MapView',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css']
})
export class MapViewComponent implements OnInit {
 // activeLocationsList: Location[];
  activeWasteData: any;
  localOwnerLocations = [];
  latitude: number = 46.98647344584873;
  longitude: number = 28.861747553664827;
  zoom: number = 8;

  dataSource = new MatTableDataSource();
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
    private _wasteDataEntryService: WasteDataEntryService, ) {
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
    //display waste owner location from waste owner list 
    this._wasteOwnerService.loadWasteOwnerById(this._wasteOwnerService.ownerIdToMap).subscribe(data => {
      this.localOwnerLocations = data.locations;

    });
    //load all active locations
    // this.loadAllActiveLocations();

    //load all active waste data
    this.loadAllactiveWasteOwnerData();
   
  }
   // this method load all waste date
  loadAllactiveWasteOwnerData() {
    this._wasteDataEntryService.loadAllActiveWasteData().subscribe(data => {
      this.activeWasteData = data;
      this.dataSource.data = this.activeWasteData;
     
      console.log(this.agmMap);
      //set boundaries for map
      this.agmMap.mapReady.subscribe(map => {
        const bounds: LatLngBounds = new google.maps.LatLngBounds();
        for (const mm of this.activeWasteData) {
          bounds.extend(new google.maps.LatLng(mm.location.latitude, mm.location.longitude));
        }
        map.fitBounds(bounds);
        
      });
    });

    this.changeDetectorRefs.detectChanges();
  }
/*
  loadAllActiveLocations() {
    // load all active locations  from db
    this._mapViewService.loadAllActiveLocations().subscribe(data => {
      this.activeLocationsList = data;
    });
  }*/

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  onChoseLocation(event) {
    console.log(event);
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
        this.loadAllactiveWasteOwnerData();
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
        this.loadAllactiveWasteOwnerData();
      }
    });
  }
}
