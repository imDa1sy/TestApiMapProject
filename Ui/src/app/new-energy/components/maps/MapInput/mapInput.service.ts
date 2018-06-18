import { Injectable } from "@angular/core";



@Injectable()
export class MapInputService {
    _latitude: number;
    _longitude: number;

    get latitude(): number {
        return this._latitude;
    }
    set latitude(latitude: number) {
        this._latitude = latitude;
    }

    get longitude(): number {
        return this._longitude;
    }
    set longitude(longitude: number) {
        this._longitude = longitude;
    }
}