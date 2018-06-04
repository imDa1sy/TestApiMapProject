import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-MapView',
  templateUrl: './MapView.component.html',
  styleUrls: ['./MapView.component.css']
})
export class MapViewComponent implements OnInit {
  latitude = 46.98647344584873;
  longitude = 28.861747553664827;
  zoom: number = 8;
  constructor() { }

  ngOnInit() {
  }
onChoseLocation(event){
  console.log(event);
}
}
