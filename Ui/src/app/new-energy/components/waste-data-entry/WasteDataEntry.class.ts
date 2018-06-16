import { WasteType } from "../waste-type/WasteType.class";
import { WasteOwnerData,Location } from "../waste-owner/WasteOwner.class";

const CONST_m3TokW = 0.0002628;

export function VolumeToPower(kw:number){
    return kw*CONST_m3TokW;
  }

export class WasteData {
    wasteDataEntry :WasteDataEntry;
    wasteOwnerData : WasteOwnerData;
    location : Location;
    wasteType : WasteType;
}

export class WasteDataEntry {
    id: string;
    wasteOwnerId: string;
    wasteLocationId: string;
    wasteTypeId: string;
    amount: number;
    wasteDataSubmited :Date;
    validityDateStart: Date;
    validityDateEnd: Date;
    expired: boolean;
}

export class WasteDataTypeSum {

    wasteType: WasteType;
    sumAmount: number;
    count: number;

    getgasVolume() {
        return this.sumAmount/1000 * this.wasteType.factor;
    };

    getPower(){
        return this.getgasVolume() * CONST_m3TokW;
    }

}