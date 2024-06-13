import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { player } from './Model/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {
url = `http://localhost:8080/api/`;
  constructor(private http:HttpClient) { }
  addPlayer(data:player):Observable<any>{
    return this.http.post<player>(this.url+'player',data);
  }

  getAll():Observable<player[]>{
    return this.http.get<player[]>(this.url+'getAll');
  }

  updateById(data:player){
    this.http.put(this.url+'update',data).subscribe(
      (response)=>{
        if(response!==null){
          console.log(response);
        }else{
          alert('wrong')
        }
      }
    );
  }
  deleteById(id:number){
    console.log(id);
    
   this.http.delete(this.url+`delete/${id}`).subscribe(
    (response)=>{
      if(response){
        alert('deleted successfully')
      }else{
        alert('went wrong');
      }
    }
   );
  }
  
   sortedByCountry():Observable<any[][]>{
     return this.http.get<any[]>(this.url+'sortedByCountry');
    }

}
