import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLangService } from './new-energy/TranslateLangService.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 defaultLanguage = 'en';
 switchLang; false;
 //variable used to show value in button to which language can be used 
 langButtonText = 'Ro';


constructor(private translate: TranslateService,
            private _translateLangService : TranslateLangService) {

             translate.setDefaultLang(this.defaultLanguage);
             //by default set current active lang to en
             this._translateLangService.currentLanguageActive = 'en';
}

switchLanguage(switchLang) {

  if(switchLang == false){ 
    
    this.switchLang=false;
    //on switchLanguage replace langbuttonText value
    this.langButtonText = 'Ro';
    //on switchLanguage set currently active lang
    this._translateLangService.currentLanguageActive = 'en';
    // on switchLanguage set global translate for all files 
    this.translate.use('en');

  }else if(switchLang == true){ 
    
    this.switchLang=true;
      //on switchLanguage replace langbuttonText value
    this.langButtonText= 'En';
    //on switchLanguage set currently active lang
    this._translateLangService.currentLanguageActive = 'ro';
     // on switchLanguage set global translate for all files 
    this.translate.use('ro');
  }
  
}
}
