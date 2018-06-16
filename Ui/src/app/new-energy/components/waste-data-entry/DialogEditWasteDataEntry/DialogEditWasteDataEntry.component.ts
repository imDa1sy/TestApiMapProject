import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Http, RequestOptions, Headers } from '@angular/http';
import { WasteOwnerService } from '../../waste-owner/WasteOwner.service';
import { WasteOwner } from '../../waste-owner/WasteOwner.class';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteType } from '../../waste-type/WasteType.class';
import { restConfig } from '../../restConfig';
import { AuthService } from '../../auth/auth.service';
import { WasteDataEntryService } from '../WasteDataEntry.service';
import { TranslateLangService } from '../../../TranslateLangService.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-DialogEditWasteDataEntry',
  templateUrl: './DialogEditWasteDataEntry.component.html',
  styleUrls: ['./DialogEditWasteDataEntry.component.css']
})
export class DialogEditWasteDataEntry implements OnInit {

  wasteOwnerLocationList: WasteOwner;
  WasteTypeList: WasteType[];
  wasteOwnerList: WasteOwner[];
  role: string;
  Language='en';

  constructor(public dialogRef: MatDialogRef<DialogEditWasteDataEntry>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private _wasteOwnerService: WasteOwnerService,
    private _wasteDataEntryService: WasteDataEntryService,
    private _wasteTypeService: WasteTypeService,
    private translate: TranslateService,
    private _translateServiceLang : TranslateLangService) {

      this.Language= this._translateServiceLang.currentLanguageActive;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  //load  waste data entry by id if is called from edit dialog
  loadWasteDataEntryById() {
    if (this.data.id == null) {

    }
    else {
      this._wasteDataEntryService.loadWasteDataById(this.data.id).subscribe(data => {
        this.data.localWasteDataEntry = data;

        //convert date that can be presented in form
        this.data.localWasteDataEntry.validityDateStart = new Date(this.data.localWasteDataEntry.validityDateStart);
        if(this.data.localWasteDataEntry.validityDateEnd != null){
        
          this.data.localWasteDataEntry.validityDateEnd = new Date(this.data.localWasteDataEntry.validityDateEnd);  
        }
        //if edit set location wasteownerid is set automaticly
        this.selectLocation(this.data.localWasteDataEntry.wasteOwnerId);
      });
    }
  }

  ngOnInit() {
    //Check which role users is,and if user is ROLE_WASTE_OWNER can select his locations
    // if user is ROLE_ADMIN or ROLE_CONTENT_MNGR then he can select waste owner and his locations
    this.authService.setRole.subscribe((value) => {
      this.role = value;
      if (value == 'ROLE_WASTE_OWNER') {

        //here is set waste owner id when waste owner is loged in
        this.data.localWasteDataEntry.wasteOwnerId = this.authService.wasteOwnerId;

      } if (value == 'ROLE_ADMIN' || value == 'ROLE_CONTENT_MNGR') {
        //get all waste owners to populate waste owner select option
        this._wasteOwnerService.loadAllActiveWasteOwners().subscribe(
          data => {
            this.wasteOwnerList = data;

          });

      }
      // get all waste types to populate form waste type select option
      this._wasteTypeService.loadAllActiveWasteTypes().subscribe(
        data => {
          this.WasteTypeList = data;

        });
    });

    //load waste data by id 
    this.loadWasteDataEntryById();

    // load all active locations of selected owner 
    this.selectLocation(this.authService.wasteOwnerId);

  
  }

  selectLocation(wasteOwnerId) {
   // select all active waste owner locations 
      this._wasteOwnerService.loadActiveLocations(wasteOwnerId).subscribe(
        data => {
          this.wasteOwnerLocationList = data;

        });  
  }
  SaveAndClose() {
    //setting date when waste data entry is submited
    let wasteDataSubmited = new Date();
    
    // here data fill wasteDataSubmited variable which hold current date
    this.data.wasteDataSubmited = wasteDataSubmited;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put('http://' + restConfig.Host + ':' + restConfig.Port + '/api/updatewastedata/' + this.data.id,
      JSON.stringify(this.data.localWasteDataEntry
      ), options).subscribe(
        (data) => {
          if (data.ok) {
            if (this.data.id == null) {

              console.log('Waste data inserted!');
              this.snackBar.open(this.translate.instant('new_energy-waste-dataEntry-data'), this.translate.instant('new_energy-inserted'), {
                duration: 4000,
              });

            } else {
              console.log('Waste data updated!');
              this.snackBar.open(this.translate.instant('new_energy-waste-dataEntry-data'), this.translate.instant('new_energy-updated'), {
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
