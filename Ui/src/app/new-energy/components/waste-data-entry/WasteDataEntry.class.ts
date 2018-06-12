import { WasteType } from "../waste-type/WasteType.class";
import { WasteOwnerData,Location } from "../waste-owner/WasteOwner.class";


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
 