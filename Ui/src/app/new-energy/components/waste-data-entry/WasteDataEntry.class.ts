import { WasteType } from "../waste-type/WasteType.class";

export class WasteDataEntry {
    id: string;
    wasteOwnerId: string;
    wasteLocation: string;
    wasteType: WasteType;
    amount: number;
    wasteDataSubmited :Date;
    validityDateStart: Date;
    validityDateEnd: Date;
    expired: boolean;
}
 