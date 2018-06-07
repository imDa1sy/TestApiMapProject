import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteOwnerService } from '../WasteOwner.service';
import { WasteOwner } from '../WasteOwner.class';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';

@Component({
  selector: 'app-DialogEditWasteOwner',
  templateUrl: './DialogEditWasteOwner.component.html',
  styleUrls: ['./DialogEditWasteOwner.component.css']
})
export class DialogEditWasteOwnerComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogEditWasteOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _wasteOwnerService: WasteOwnerService) {
    // this.loadData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addLocations() {
    //creates new form fields in DialogEditWasteUser for creating new location
    this.data.localWasteOwner.locations.push({
      "myId": 'null',
      "sortNum": this.data.localWasteOwner.locations.length,
      "active": true,
      "description": '',
      "latitude": '',
      "longitude": ''
    });
  }

  deactivateLocation($event, item, i) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "Location", "entity_id": 'null' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        //shink size of array of location by 1 for every method call if form is empty
        if (this.data.localWasteOwner.locations[i].description == '' || this.data.localWasteOwner.locations[i].latitude == 0 || this.data.localWasteOwner.locations[i].longitude == 0) {
          $event.preventDefault();
          $event.stopPropagation();
          this.data.localWasteOwner.locations.splice(this.data.localWasteOwner.locations.indexOf(item), 1);

        } else {
          //set selected location active status to false if form had data
          this.data.localWasteOwner.locations[i].active = false;

        }
      }
    });

  }

  addUsers() {
    //creates new form fields in DialogEditWasteOwner for creating new user
    this.data.localWasteOwner.users.push({
      "enableUsername": true,
      "enableAddUser": true,
      "myId": 'null',
      "active": true, //is user active
      "role": "ROLE_WASTE_OWNER",
      "userName": "",
      "password": "",
      // "confirmPassword":''
    });
  }
  deactivateUser($event, item, i) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "User", "entity_id": 'null' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        //shink size of array of location by 1 for every method call if form is empty
        if (this.data.localWasteOwner.users[i].userName == '' || this.data.localWasteOwner.users[i].password == '') {
          $event.preventDefault();
          $event.stopPropagation();
          this.data.localWasteOwner.users.splice(this.data.localWasteOwner.users.indexOf(item), 1);

        } else {
          //set selected user active status to false if form had data
          this.data.localWasteOwner.users[i].active = false;

        }
      }
    });
  }

  ngOnInit() {

  }

  SaveAndClose() {

    var wasteOwner = {
      wasteOwnerData: this.data.localWasteOwner.wasteOwnerData,
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
