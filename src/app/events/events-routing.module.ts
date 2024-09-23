import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events.component";
import {EventHomeComponent} from "./event-home/event-home.component";
import {EventPopularComponent} from "./event-popular/event-popular.component";
import {EventRecomendationComponent} from "./event-recomendation/event-recomendation.component";
import {EventFavoriteComponent} from "./event-favorite/event-favorite.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: EventHomeComponent },
      { path: 'popular', component: EventPopularComponent },
      { path: 'recommendation', component: EventRecomendationComponent },
      { path: 'favorite', component: EventFavoriteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {

}
