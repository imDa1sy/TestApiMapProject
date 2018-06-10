import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { DialogEditUserComponent } from '../DialogEditUser/DialogEditUsercomponent';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../User.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../User.class';

@Component({
  selector: 'app-ListUser',
  templateUrl: './ListUser.component.html',
  styleUrls: ['./ListUser.component.css']
})
export class ListUserComponent implements OnInit {

 //=========================== ATTRIBUTES ==========================================
 userList: any;
 dataSource = new MatTableDataSource();

 //displayedColumns is array of strings,and every string is representation of one column in table.
 displayedColumns = [];
 ROLE: string;
 

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 constructor(
   private changeDetectorRefs: ChangeDetectorRef,
   private _userService: UserService,
   public dialog: MatDialog,
   public snackBar: MatSnackBar,
   private authService: AuthService) {
   this.authService.setRole.subscribe((value) => {

     this.ROLE = value;
     if (value == 'ROLE_WASTE_OWNER') {
       this.displayedColumns = [ 'userName','role'];
     } if (value == 'ROLE_ADMIN') {
       this.displayedColumns = [ 'userName','role', 'actionsColumn'];
     }
    
   });
 }

 //============================ METHODS =============================================             
 refresh() {
   this._userService.loadAllActiveUsers().subscribe(
     data => {
       this.userList = data;
       this.dataSource.data = this.userList;
   
     });
   this.changeDetectorRefs.detectChanges();
 }

 searchElements(search: string = "") {
   console.log(search);
   this.dataSource.filter = search.toLowerCase().trim();
 }
 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }
 ngOnInit() {
   this.refresh();
 }
 NewUser() {

  let localUserAdd={
    userName: '',
    password: '', //representation of user class to used when creating new user from DialogEditUser
    role: 'ROLE_CONTENT_MNGR',
    active:true

  }
   let dialogRef = this.dialog.open(DialogEditUserComponent, {
    // disableClose: true,
     autoFocus: true,
     width: '500px', height: '500px', data: { 
       "id": null,
       "showRole": true,
       "enableUsername":true,      
       "localUser":localUserAdd
       }
   });
   dialogRef.afterClosed().subscribe(result => {
     if (result != null) {
       this.refresh();
     }

   });
 }
 editUser(elementData) {
   
   let dialogRef = this.dialog.open(DialogEditUserComponent, {
    // disableClose: true,
     autoFocus: true,
     width: '500px', height: '500px',
     data: {
       "id": elementData.id,
       "showRole": true,
       "enableUsername":false,      
       "localUser": User

     }
   });
   dialogRef.afterClosed().subscribe(result => {
     if (result != null) {
       this.refresh();
     }

   });
 // });
 }
 
 deleteUser(id) {
   let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
     width: '300px', height: '300px',
     data: { "text": "User", "restName": "/api/removeuser/", "entity_id": id }
   });
   dialogRef.afterClosed().subscribe(result => {
     if (result != null) {
       this.refresh();
     }
   });
 }
}
