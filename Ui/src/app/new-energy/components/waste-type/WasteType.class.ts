export class WasteType {
    constructor(){}
    id :string;
    name:string;
    active: boolean;
    wasteType : MultiLanguageDescription;
    color:string;
    factor: number;
}
export class MultiLanguageDescription{
   en:string;
   ro:string;
}

export class WasteTypeSearch extends WasteType {
    constructor(){
        super();
        this.search=true;
    }
    copyFromWasteType(wasteType:WasteType){
        this.id=wasteType.id;
        this.name=wasteType.name;
        this.active=wasteType.active;
        this.wasteType=wasteType.wasteType;
        this.color=wasteType.color;
        this.search=true;
        this.factor = wasteType.factor;
    }
    search:boolean;
}

export class WasteTypeFilter{
    constructor(){
        this.inFuture= false;
        this.expired = false;
        this.NElon=0;
        this.NElat=0;
        this.SWlon=0;
        this.SWlat=0;
        this.wasteTypeSearch=[];
    }
    inFuture : boolean;
    expired : boolean;
    NElon:number;
    NElat:number;
    SWlon:number;
    SWlat:number;
    wasteTypeSearch:WasteTypeSearch[];
}