import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-sorted',
  templateUrl: './sorted.component.html',
  styleUrls: ['./sorted.component.css']
})
export class SortedComponent implements OnInit{

  constructor(private service:PlayerServiceService){

  }
  ngOnInit() {
    this.getSortedByCountry();
  }
 
  players:any[] = [];
  getSortedByCountry(){
    this.service.sortedByCountry().subscribe(
    (response)=>{
      console.log(response);
      
      this.players = response;
      console.log(response);
    }
    )
  }
}
