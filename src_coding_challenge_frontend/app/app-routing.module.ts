import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { SortedComponent } from './sorted/sorted.component';

const routes: Routes = [
 
  {path:'player-info',component:PlayerComponent},
   {path:'add-player',component:AddPlayerComponent},
   {path:'view-all',component:ViewAllComponent},
   {path:'update/:playerId',component:UpdateComponent},
   {path:'sorted',component:SortedComponent},
   {path:'search',component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
