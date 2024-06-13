import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome to the angular';

   id:number = 101;
   name:string = 'javeed';


    hello(){


        alert('hello world!');

    }


}
