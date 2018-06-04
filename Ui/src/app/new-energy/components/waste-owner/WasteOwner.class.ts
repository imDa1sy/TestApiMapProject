import { User } from "../user/User.class";

export class WasteOwner {
    constructor() { }

    wasteOwnerData: WasteOwnerData;
    locations: Location[];
    users: User[];


}
export class Location {
    id: string;
    description: string;
    latitude: string; //change to number
    longitude: string; //change to number
}

export class WasteOwnerData {
    name: string;
    surName: string;
    companyName: string;
    address: string;
    contact: {
        telephone: string;
        mobile: string;
        email: string;
    }
}