import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteOwnerService } from '../WasteOwner.service';
import { WasteOwner } from '../WasteOwner.class';

@Component({
  selector: 'app-DialogEditWasteOwner',
  templateUrl: './DialogEditWasteOwner.component.html',
  styleUrls: ['./DialogEditWasteOwner.component.css']
})
export class DialogEditWasteOwnerComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogEditWasteOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    private _wasteOwnerService: WasteOwnerService ) {
     // this.loadData();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addLocations() {
    this.data.localWasteOwner.locations.push({
      "sortNum":this.data.localWasteOwner.locations.length,
      "description": '',
      "latitude": '',
      "longitude": ''
    });
  }
  deleteLocation($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.data.localWasteOwner.locations.splice(this.data.localWasteOwner.locations.indexOf(item), 1);
  }
  addUsers() {
   
    this.data.localWasteOwner.users.push({
      "role": "ROLE_WASTE_OWNER",
      "userName": "",
      "password": "" ,
     // "confirmPassword":''
    });
  }
  deleteUsers($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.data.localWasteOwner.users.splice(this.data.localWasteOwner.users.indexOf(item), 1);
  }
 
  ngOnInit() {

    console.log(this.data)
  
  }

  SaveAndClose() {

    var wasteOwner = {
      wasteOwnerData : this.data.localWasteOwner.wasteOwnerData,
      locations: this.data.localWasteOwner.locations,
      users: this.data.localWasteOwner.users
    }
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put('http://' + restConfig.Host + ':' + restConfig.Port + '/api/updatewasteowner/' + this.data.id,
      JSON.stringify(wasteOwner), options).subscribe(
        (data) => {
          if (data.ok) {
            if (this.data.id == null) {

              console.log('Waste owner inserted!');
              this.snackBar.open("Waste owner ", " inserted!", {
                duration: 4000,
              });

            } else {
              console.log('Waste owner update!');
              this.snackBar.open("Waste owner ", " updated!", {
                duration: 4000,
              });

            }
          } else if (!data.ok) {
            this.snackBar.open("Error ", " occurred!", {
              duration: 4000,
            });
          }
        });
  }
}
