import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Http, RequestOptions, Headers } from '@angular/http';
import { WasteOwnerService } from '../../waste-owner/WasteOwner.service';
import { restConfig } from '../../restConfig';
import { UserService } from '../User.service';
import { User } from '../User.class';
import { FormPatterns } from '../../FormPatterns';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-DialogEditUser',
  templateUrl: './DialogEditUser.component.html',
  styleUrls: ['./DialogEditUser.component.css']
})
export class DialogEditUserComponent implements OnInit {


  userNameAvailable: boolean=true;
  checkAvailabilityList: User[];
  passwordPattern = FormPatterns.passwordPattern;
  usernamePattern = FormPatterns.usernamePattern;
  
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    private translate: TranslateService,
    private _userService: UserService) {
     // this.loadAllUsers();
    //in constructor is called method loadUserData so can be ready to insert data
    this.loadUserData();

  }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  loadAllUsers(userName){
      console.log(userName)
    //load all users to check username and email availability
    this._userService.loadAllUsers().subscribe((data)=>{
     this.checkAvailabilityList = data;
     for (const iterator of this.checkAvailabilityList) {
       if(userName == iterator.userName){
         this.userNameAvailable = false;
         break;
      
       }else {
        this.userNameAvailable = true;
       
       }
     }
    
   
    });
  }
  loadUserData() {
    //loadUserData method if id is null do nothing else load userbyid
    if (this.data.id == null) {
    //if is executed if add form is called
    }
    else {
     //else is called if edit form is called
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
              this.snackBar.open(this.translate.instant('new_energy-user-header'), this.translate.instant('new_energy-inserted'), {
                duration: 4000,
              });

            } else {
              console.log('User update!');
              this.snackBar.open(this.translate.instant('new_energy-user-header'), this.translate.instant('new_energy-updated'), {
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