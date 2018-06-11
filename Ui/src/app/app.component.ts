import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 defaultLanguage = 'en';
 switchLang; false;
 langName = 'Ro';
constructor(private translate: TranslateService) {
  translate.setDefaultLang(this.defaultLanguage);
}

switchLanguage(switchLang) {

  if(switchLang == false){ 
    this.switchLang=false;
    this.langName = 'Ro';
    this.translate.use('en');

  }else if(switchLang == true){ 
    
    this.switchLang=true;
    this.langName= 'En';
    this.translate.use('ro');
  }
  
}
}
