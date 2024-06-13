import { Component } from '@angular/core';
import { player } from '../Model/player';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {
players = new player();
constructor(private service:PlayerServiceService){}
  formData(data:any){
    this.players.playerId = data.playerId
    console.log(this.players.playerId)
    this.service.addPlayer(data).subscribe(
      (response)=>{
        console.log(response);
      }
    );
    
  }
}
