import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {


  constructor(
    private translate: TranslateService,

  ) {

  }
  language = new BehaviorSubject('');




  get defaultLang() {
    return this.language.value
  }


  setLanguage() {

    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang)
      return this.language.next(lang)

    } else {
      this.translate.setDefaultLang('ka');
      return this.language.next('ka')


    }
  }


}
