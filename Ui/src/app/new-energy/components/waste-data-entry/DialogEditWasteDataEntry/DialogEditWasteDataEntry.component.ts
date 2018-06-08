import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Http } from '@angular/http';
import { WasteOwnerService } from '../../waste-owner/WasteOwner.service';
import { WasteOwner } from '../../waste-owner/WasteOwner.class';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteType } from '../../waste-type/WasteType.class';

@Component({
  selector: 'app-DialogEditWasteDataEntry',
  templateUrl: './DialogEditWasteDataEntry.component.html',
  styleUrls: ['./DialogEditWasteDataEntry.component.css']
})
export class DialogEditWasteDataEntry implements OnInit {

  wasteOwnerLocationList: WasteOwner;
  WasteTypeList: WasteType[];
  wasteOwnerList: WasteOwner[];
  role :string;
  constructor(public dialogRef: MatDialogRef<DialogEditWasteDataEntry>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _wasteOwnerService: WasteOwnerService,
    private _wasteTypeService: WasteTypeService ) { 

      //get all waste owners to populate waste owner select option
      this._wasteOwnerService.getData().subscribe(
        data => {
          this.wasteOwnerList = data;
         
        });
        // get all waste types to populate form waste type select option
        this._wasteTypeService.getData().subscribe(
          data => {
            this.WasteTypeList = data;
          
          });
      
    /*  this.data.wasteOwnerId="test1" 
      this.data.wasteLocation="Location 1"
      this.data.wasteType='Grass'*/
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.role="ROLE_ADMIN";
  }

selectLocation(wasteOwnerId){
  console.log(wasteOwnerId)
  this._wasteOwnerService.loadActiveLocations(wasteOwnerId).subscribe(
    data => {
      this.wasteOwnerLocationList = data;
     
    });
}
  SaveAndClose(){
    //setting date when waste data entry is submited
    let wasteDataSubmited = new Date();
  
    // here data fill wasteDataSubmited variable which hold current date
    this.data.wasteDataSubmited=wasteDataSubmited;

    console.log(this.data)
  }
}
