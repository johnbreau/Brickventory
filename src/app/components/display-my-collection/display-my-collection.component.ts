import { Component, OnInit } from '@angular/core';
import { MySetsDatabaseService } from '../../services/mySetsDatabaseService/my-sets-database.service';
import { Set } from '../../interfaces/set.interface';

@Component({
  selector: 'app-display-my-collection',
  templateUrl: './display-my-collection.component.html',
  styleUrls: ['./display-my-collection.component.scss']
})
// This component displays all sets in the current user's collection...
export class DisplayMyCollectionComponent {
  public sets: Set[];
  public barcode = '6009705662678';
  public barcodeReturn: any;
  public displaySet: any;
  public setData: any;

  constructor (
    public mySetDatabase: MySetsDatabaseService) {
      this.mySetDatabase.getCollection()
      .subscribe(sets => {
        this.setData = (JSON.stringify(sets));
        this.displaySet = JSON.parse(this.setData);
      });
  }

  deleteSet(id) {
    const sets = this.sets;
    this.mySetDatabase.deleteSet(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < sets.length; i++) {
            if (sets[i]._id === id) {
              sets.splice(i, 1);
            }
          }
        }
      });
    }
}
