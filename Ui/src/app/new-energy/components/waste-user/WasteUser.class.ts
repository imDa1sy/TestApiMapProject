import { User } from "../user/User.class";

export class WasteUser {
    constructor() { }

    wasteUserData: WasteUserData;
    locations: Location[];
    users: User[];


}
export class Location {
    id: string;
    active:boolean;
    description: string;
    latitude: number;
    longitude: number;
}

export class WasteUserData{
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