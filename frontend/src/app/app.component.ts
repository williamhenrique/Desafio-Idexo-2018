import { Component } from '@angular/core';

import { ComponentService } from './component.service';
@Component({
  selector: 'front-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private service: ComponentService){
    this.setSession();
  }

  setSession(){
    this.service.getSession()
    .subscribe(
      session => {
        if(!this.service.validateSession()){
          localStorage.setItem('session_api', session['session'])
        }
      },
      error => console.log(error)
    );
  }
}
