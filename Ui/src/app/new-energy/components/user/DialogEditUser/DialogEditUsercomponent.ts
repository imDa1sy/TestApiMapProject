import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Http, RequestOptions, Headers } from '@angular/http';
import { WasteOwnerService } from '../../waste-owner/WasteOwner.service';
import { restConfig } from '../../restConfig';
import { UserService } from '../User.service';
import { User } from '../User.class';
import { FormPatterns } from '../../FormPatterns';

@Component({
  selector: 'app-DialogEditUser',
  templateUrl: './DialogEditUser.component.html',
  styleUrls: ['./DialogEditUser.component.css']
})
export class DialogEditUserComponent implements OnInit {


  passwordPattern = FormPatterns.passwordPattern;
  usernamePattern = FormPatterns.usernamePattern;
  
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    private _userService: UserService) {

    this.loadUserData();
  }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  loadUserData() {
    if (this.data.id == null) {

    }
    else {
      this._userService.loadUserById(this.data.id).subscribe(data => {
        this.data.localUser = data;
        this.data.localUser.password = '';
      });
    }
  }
  SaveAndClose() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put('http://' + restConfig.Host + ':' + restConfig.Port + '/api/updateuser/' + this.data.id,
      JSON.stringify(
        this.data.localUser
      ), options).subscribe(
        (data) => {
          if (data.ok) {
            if (this.data.id == null) {

              console.log('User inserted!');
              this.snackBar.open("User ", " inserted!", {
                duration: 4000,
              });

            } else {
              console.log('User update!');
              this.snackBar.open("User ", " updated!", {
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