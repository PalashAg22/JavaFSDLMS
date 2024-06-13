import { Component, OnInit } from '@angular/core';
import { player } from '../Model/player';
import { PlayerServiceService } from '../player-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit{
playerList:player[] = [];
constructor(private service:PlayerServiceService, private router:Router){}
  ngOnInit(): void {
    this.getAll();
  }
getAll(){
  this.service.getAll().subscribe(
    (response)=>{
      this.playerList = response;
      console.log(response);
    }
  )
}
// ngOnint(){
//   this.service.getAll().subscribe(
//     (response)=>{
//       this.playerList = response;
//       console.log(response);
//     }
//   )
// }
updateById(palyerId:number){
this.router.navigate(['update',palyerId])
}
deleteById(id:number){
  console.log(id);
 this.service.deleteById(id);
//  this.router.navigate(['view-all'])
 this.getAll();
}
}
