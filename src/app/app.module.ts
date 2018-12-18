import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QueryMyCollectionComponent } from './components/query-my-collection/query-my-collection.component';
import { AddToMyCollectionComponent } from './components/add-to-my-collection/add-to-my-collection.component';
import { DisplayMyCollectionComponent } from './components/display-my-collection/display-my-collection.component';

import { MySetsDatabaseService } from './services/mySetsDatabaseService/my-sets-database.service';
import { LegoGroupSetsDatabaseService } from './services/legoGroupSetsDatabaseService/lego-group-sets-database.service';
import { BricksetScraperService } from './services/bricksetScraperService/brickset-scraper-service.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryLegoGroupSetsComponent } from './components/query-lego-group-sets/query-lego-group-sets.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryMyCollectionComponent,
    AddToMyCollectionComponent,
    DisplayMyCollectionComponent,
    QueryLegoGroupSetsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [MySetsDatabaseService,
              LegoGroupSetsDatabaseService,
              BricksetScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
