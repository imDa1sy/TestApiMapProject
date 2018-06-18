import { Component, OnInit, Inject } from '@angular/core';
import { MapInputService } from './mapInput.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mapinput',
  templateUrl: './mapinput.component.html',
  styleUrls: ['./mapinput.component.css']
})
export class MapinputComponent implements OnInit {
  //here we take mapClick events and send it to location input in forms 

  //default map center
  latitude: number = 46.98647344584873;
  longitude: number = 28.861747553664827;
  locationChosen = false;
  //default zoom
  zoom: number = 8;
  constructor(public dialogRef: MatDialogRef<MapinputComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mapInputService: MapInputService, public dialog: MatDialog) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  getLatLon(coordinates) {
    // here we set location latitude and longitude to be ready to serve in wasteOwner and WasteUser component
    this._mapInputService._latitude = coordinates.coords.lat
    this._mapInputService._longitude = coordinates.coords.lng
    this.locationChosen = true;
  }
}
