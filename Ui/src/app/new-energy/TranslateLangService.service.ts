import { Injectable } from "@angular/core";

@Injectable()
export class TranslateLangService {
/**
 *  This translateLangService is used as service for matching languages from database
 *  with current active language.Is used in:
 *
 *  MapViewComponent, DialogEditWasteDataEntry,ListWasteDataEntry,DialogEditWasteType,
 *  ListWasteType
 * 
 */

    //by default language is set to english then i switchLanguage value is changed
    //based on selected language
    currentLanguage : string;

    get currentLanguageActive(): string {
        return this.currentLanguage;
    }
    set currentLanguageActive(currentLanguage: string) {
        this.currentLanguage = currentLanguage;
    }
}