import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RequestOptions, Http, Headers } from '@angular/http';
import { restConfig } from '../../restConfig';
import { WasteTypeService } from '../Wastetype.service';

@Component({
  selector: 'app-DialogEditWasteType',
  templateUrl: './DialogEditWasteType.component.html',
  styleUrls: ['./DialogEditWasteType.component.css']
})
export class DialogEditWasteTypeComponent implements OnInit {

  wasteType: any;
  color: any;
  constructor(public dialogRef: MatDialogRef<DialogEditWasteTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, private snackBar: MatSnackBar,
    private _wasteTypeService: WasteTypeService) {

    this.loadWasteTypeData();
  }
  loadWasteTypeData() {
    if (this.data.id == null) {

    }
    else {
      this._wasteTypeService.loadWasteTypeById(this.data.id).subscribe(data => {
        this.data.localWasteType = data;
console.log(this.data.localWasteType)
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    // in data we have id which is either null (new waste type) or has an id for editing
    // if id is null do nothing
    // if id is filled then call backend for getting the data from the database
    // TODO beta version - loading from database *also backend is neccessary
  }

  SaveAndClose() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put('http://' + restConfig.Host + ':' + restConfig.Port + '/api/updatewastetype/' + this.data.id,
      JSON.stringify( this.data.localWasteType
      ), options).subscribe(
        (data) => {
          if (data.ok) {
            if (this.data.id == null) {

              console.log('Waste type inserted!');
              this.snackBar.open("Waste type ", " inserted!", {
                duration: 4000,
              });

            } else {
              console.log('Waste type updated!');
              this.snackBar.open("Waste type ", " updated!", {
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
