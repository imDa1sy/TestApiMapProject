import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';

import { Http, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteUserService } from '../WasteUser.service';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';

@Component({
  selector: 'app-DialogEditWasteUser',
  templateUrl: './DialogEditWasteUser.component.html',
  styleUrls: ['./DialogEditWasteUser.component.css']
})
export class DialogEditWasteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditWasteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _wastUserService: WasteUserService, ) { }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addUsers() {
    //creates new form fields in DialogEditWasteUser for creating new user
    this.data.localWasteUser.users.push({
      "enableUsername": true,
      "enableAddUser": true,
      "myId": 'null',
      "active": true, //is user active
      "role": "ROLE_WASTE_USER",
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
        if (this.data.localWasteUser.users[i].userName == '' || this.data.localWasteUser.users[i].password == '') {
          $event.preventDefault();
          $event.stopPropagation();
          this.data.localWasteUser.users.splice(this.data.localWasteUser.users.indexOf(item), 1);

        } else {
          //set selected user active status to false if form had data
          this.data.localWasteUser.users[i].active = false;

        }
      }
    });
  }
  /*
  deleteUsers($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.data.localWasteUser.users.splice(this.data.localWasteUser.users.indexOf(item), 1);
  }*/


  SaveAndClose() {

    var wasteUser = {
      wasteUserData: this.data.localWasteUser.wasteUserData,
      locations: this.data.localWasteUser.locations,
      users: this.data.localWasteUser.users
    }
    console.log(this.data.locations)

    console.log('waste user data in dialog edit waste ' + wasteUser)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put('http://' + restConfig.Host + ':' + restConfig.Port + '/api/updatewasteuser/' + this.data.id,
      JSON.stringify(wasteUser), options).subscribe(
        (data) => {
          if (data.ok) {
            if (this.data.id == null) {

              console.log('Waste user inserted!');
              this.snackBar.open("Waste user ", " inserted!", {
                duration: 4000,
              });

            } else {
              console.log('Waste user update!');
              this.snackBar.open("Waste user ", " updated!", {
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

