import { Component, OnInit } from '@angular/core';
import { WasteOwnerService } from '../waste-owner/WasteOwner.service';

@Component({
  selector: 'app-MapView',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css']
})
export class MapViewComponent implements OnInit {
  localOwnerLocations =[];
  latitude: number = 46.98647344584873;
  longitude: number = 28.861747553664827;
  zoom: number = 10;
  constructor( private _wasteOwnerService: WasteOwnerService) { }

  ngOnInit() {
    this._wasteOwnerService.loadWasteUserById(this._wasteOwnerService.ownerIdToMap).subscribe(data => {
      this.localOwnerLocations = data.locations;
      console.log('Locations in map view '+ this.localOwnerLocations);
    });
    console.log('in map '+ this._wasteOwnerService.ownerIdToMap);
  }
onChoseLocation(event){
  console.log(event);
}
}
