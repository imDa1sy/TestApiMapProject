import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Http, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteUserService } from '../WasteUser.service';

@Component({
  selector: 'app-DialogEditWasteUser',
  templateUrl: './DialogEditWasteUser.component.html',
  styleUrls: ['./DialogEditWasteUser.component.css']
})
export class DialogEditWasteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditWasteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    private _wastUserService: WasteUserService, ) { }

  ngOnInit() {
    console.log('waste users ' + this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addUsers() {
    this.data.localWasteUser.users.push({
      "role": "ROLE_WASTE_USER",
      "userName": "",
      "password": "",
      // "confirmPassword":''
    });
  }
  deleteUsers($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.data.localWasteUser.users.splice(this.data.localWasteUser.users.indexOf(item), 1);
  }


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

