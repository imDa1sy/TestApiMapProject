import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { restConfig } from './components/restConfig';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditWasteTypeComponent } from './components/waste-type/DialogEditWasteType/DialogEditWasteType.component';
import { DialogEditWasteOwnerComponent } from './components/waste-owner/DialogEditWasteOwner/DialogEditWasteOwner.component';
import { DialogEditWasteUserComponent } from './components/waste-user/DialogEditWasteUser/DialogEditWasteUser.component';

@Component({
  selector: 'app-new-energy',
  templateUrl: './new-energy.component.html',
  styleUrls: ['./new-energy.component.css']
})
export class NewEnergyComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  ROLE: string;

  constructor(private authService: AuthService, private dialog: MatDialog, ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.bSubject.subscribe((value) => {
      this.ROLE = value;
    });

  }

  onLogout() {
    this.authService.logout();
  }
/*
  newWasteOwner() {
    let dialogRef = this.dialog.open(DialogEditWasteOwnerComponent, {
      disableClose: true,
      autoFocus: true,
      width: '600px', height: '550px', data: { "id": null }
    });
  }
  newWasteUser() {
    let dialogRef = this.dialog.open(DialogEditWasteUserComponent, {
      disableClose: true,
      autoFocus: true,
      width: '600px', height: '550px', data: { "id": null }
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