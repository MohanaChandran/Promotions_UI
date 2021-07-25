import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KeywordListComponent} from './components/keyword-list/keyword-list.component';
import {KeywordDetailsComponent} from './components/keyword-details/keyword-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'keywords', pathMatch: 'full' },
  { path: 'keywords', component: KeywordListComponent },
  { path: 'keywords/edit/:id', component: KeywordDetailsComponent },
  { path: 'keywords/create', component: KeywordDetailsComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
