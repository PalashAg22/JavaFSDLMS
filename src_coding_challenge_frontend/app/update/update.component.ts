import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../player-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
constructor(private route:ActivatedRoute, private service:PlayerServiceService,private formBuilder: FormBuilder){}
playerId!:number;
updateForm!: FormGroup;

  

  ngOnInit() {
    this.route.params.subscribe(params=> this.playerId = params['playerId']);
    console.log(this.playerId);
    this.updateForm = this.formBuilder.group({
      playerId: [''], 
      playerName: ['', Validators.required],
      jerseyNumber: ['', Validators.required],
      role: ['', Validators.required],
      totalMatches: ['', Validators.required],
      teamName: ['', Validators.required],
      country: ['', Validators.required],
      description: ['']
    });
  }

  
  
  onSubmit(){
    console.log(this.updateForm.value);
    this.service.updateById(this.updateForm.value);
  }

  
}
