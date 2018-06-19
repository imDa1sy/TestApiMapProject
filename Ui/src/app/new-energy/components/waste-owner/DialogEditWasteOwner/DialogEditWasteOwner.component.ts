import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteOwnerService } from '../WasteOwner.service';
import { WasteOwner } from '../WasteOwner.class';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { FormPatterns } from '../../FormPatterns';
import { TranslateService } from '@ngx-translate/core';
import { MapinputComponent } from '../../maps/MapInput/mapinput.component';
import { MapInputService } from '../../maps/MapInput/mapInput.service';
import { UserService } from '../../user/User.service';

@Component({
  selector: 'app-DialogEditWasteOwner',
  templateUrl: './DialogEditWasteOwner.component.html',
  styleUrls: ['./DialogEditWasteOwner.component.css']
})
export class DialogEditWasteOwnerComponent implements OnInit {
 
  checkEmailAvailabilityList: any;
  emailPattern = FormPatterns.emailPattern;
  passwordPattern = FormPatterns.passwordPattern;
  usernamePattern = FormPatterns.usernamePattern;

  emailAvailable: boolean = true;
  userNameAvailable = [];
  checkUserNameAvailabilityList: any;
  counter;
  constructor(public dialogRef: MatDialogRef<DialogEditWasteOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _wasteOwnerService: WasteOwnerService,
    private _mapInputService :MapInputService,
    private _userService: UserService,
    private translate: TranslateService) {
      
     this.loadWasteOwnerData();
  }

  loadAllUserName(userName,i){
    this.counter = i;
  //load all users to check username  availability
  this._userService.loadAllUsers().subscribe((data)=>{
   this.checkUserNameAvailabilityList = data;
   for (const iterator of this.checkUserNameAvailabilityList) {

     if(userName == iterator.userName){
       
       this.userNameAvailable[i] = false;
       break;
    
     }else {
      this.userNameAvailable[i] = true;  
     }
   }  
  });
}
loadAllUserEmail(email){
 
//load all users to  email availability
this._wasteOwnerService.loadAllWasteOwners().subscribe((data)=>{
 this.checkEmailAvailabilityList = data;
 for (const iterator of this.checkEmailAvailabilityList) {
  
   if(email == iterator.contact.email){
     this.emailAvailable = false;
     break;
     
   }else{
     this.emailAvailable = true;
   }
 }
});
}
  loadWasteOwnerData() {
    if (this.data.id == null) {

    }
    else {
      this._wasteOwnerService.loadWasteOwnerById(this.data.id).subscribe(data => {
        this.data.localWasteOwner = data;
        
      });
    }
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

  addLatLng(index) {
    //call mapInputComponent and get coords 
    let dialogRef = this.dialog.open(MapinputComponent, {
      width: '700px', height: '650px',
      data: { }
    });
    //creates new form fields in DialogEditWasteOwner for creating new location
    dialogRef.afterClosed().subscribe(result => {
      //if coords are selected create location with that coords else do nothing 
      if (result != null) {
        //insert latitude in form
    this.data.localWasteOwner.locations[index].latitude = this._mapInputService._latitude;
    //insert longitude in form
    this.data.localWasteOwner.locations[index].longitude = this._mapInputService.longitude;
    
  }
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
          this.data.localWasteOwner.locations.splice(this.data.localWasteOwner.locations.indexOf(i), 1);

        } else {
          //set selected location active status to false if form had data
          this.data.localWasteOwner.locations[i].active = false;

        }
      }
    });

  }

  addUsers() {
    //creates new form fields in DialogEditWasteOwner for creating new user
   
    this.userNameAvailable[this.counter];
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
          this.data.localWasteOwner.users.splice(this.data.localWasteOwner.users.indexOf(i), 1);

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
              this.snackBar.open(this.translate.instant('new_energy-waste-owner-header'), this.translate.instant('new_energy-inserted'), {
                duration: 4000,
              });

            } else {
              console.log('Waste owner update!');
              this.snackBar.open(this.translate.instant('new_energy-waste-owner-header'), this.translate.instant('new_energy-updated'), {
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
