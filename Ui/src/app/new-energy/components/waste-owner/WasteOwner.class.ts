import { User } from "../user/User.class";

export class WasteOwner {
    constructor() { }

    wasteOwnerData: WasteOwnerData;
    locations: Location[];
    users: User[];


}
export class Location {
    id: string;
    active:boolean;
    description: string;
    latitude: number; //change to number
    longitude: number; //change to number
}

export class WasteOwnerData {
    name: string;
    surName: string;
    companyName: string;
    address: string;
    active:boolean;
    contact: {
        telephone: string;
        mobile: string;
        email: string;
    }
}