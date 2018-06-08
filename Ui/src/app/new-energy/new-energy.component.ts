import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { restConfig } from './components/restConfig';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditWasteTypeComponent } from './components/waste-type/DialogEditWasteType/DialogEditWasteType.component';
import { DialogEditWasteOwnerComponent } from './components/waste-owner/DialogEditWasteOwner/DialogEditWasteOwner.component';
import { DialogEditWasteUserComponent } from './components/waste-user/DialogEditWasteUser/DialogEditWasteUser.component';
import { DialogEditWasteDataEntry } from './components/waste-data-entry/DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';


@Component({
  selector: 'app-new-energy',
  templateUrl: './new-energy.component.html',
  styleUrls: ['./new-energy.component.css']
})
export class NewEnergyComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  ROLE: string;
  showLoginDialog;
  constructor(private authService: AuthService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; //on init  isLogedIn$ get response if should show nav bar 
   
    this.authService.setRole.subscribe((value) => {
      this.ROLE = value; // on init role is set via set role BehaviorSubject from auth service
    });
    this.authService.showLoginDialog.subscribe((value) => {
      this.showLoginDialog = value; // on init showLoginDialog is set via set showLoginDialog BehaviorSubject from auth service
     
    });
  }

  onLogout() {
    this.authService.logout();
  }
  newWasteDataEntry(){
    let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
      //disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: { "id": null ,"wasteOwner":"wasteOwner"}
    });
  }
/*
  newWasteOwner() {
    let dialogRef = this.dialog.open(DialogEditWasteOwnerComponent, {
      disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: { "id": null }
    });
  }
  newWasteUser() {
    let dialogRef = this.dialog.open(DialogEditWasteUserComponent, {
      disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: { "id": null }
    });
  }
  NewWasteType() {
    let editWasteType = this.dialog.open(DialogEditWasteTypeComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px', height: '350px', data: { "id": null }
    });
  }*/
}
