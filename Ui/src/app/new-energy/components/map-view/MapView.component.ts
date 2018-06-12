import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteOwnerService } from '../waste-owner/WasteOwner.service';
import { MapViewService } from './MapView.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { WasteDataEntryService } from '../waste-data-entry/WasteDataEntry.service';

@Component({
  selector: 'app-MapView',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css']
})
export class MapViewComponent implements OnInit {
  activeLocationsList: Location[];
  activeWasteData:any;
  localOwnerLocations = [];
  latitude: number = 46.98647344584873;
  longitude: number = 28.861747553664827;
  zoom: number = 10;

  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(private _wasteOwnerService: WasteOwnerService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog,
              private authService: AuthService,
              private _mapViewService: MapViewService,
              private _wasteDataEntryService: WasteDataEntryService,) {
              //check  role and display table based on role
        this.authService.setRole.subscribe((value) => {
          this.ROLE = value;
          if (value == 'ROLE_WASTE_USER') {
           this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
                                    'validityDate', /*'actionsColumn'*/];
          }
          if (value == 'ROLE_ADMIN' || value== 'ROLE_CONTENT_MNGR') {
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

loadAllactiveWasteOwnerData(){
  this._wasteDataEntryService.loadAllActiveWasteData().subscribe(data => {
    this.activeWasteData = data;
    this.dataSource.data = this.activeWasteData;
    
  });

  this.changeDetectorRefs.detectChanges();
}

  loadAllActiveLocations() {
    // load all active locations  from db
    this._mapViewService.loadAllActiveLocations().subscribe(data => {
      this.activeLocationsList = data;
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  onChoseLocation(event) {
    console.log(event);
  }
}
