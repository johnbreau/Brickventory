import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MySetsDatabaseService } from '../../services/mySetsDatabaseService/my-sets-database.service';

@Component({
  selector: 'app-query-my-collection',
  templateUrl: './query-my-collection.component.html',
  styleUrls: ['./query-my-collection.component.scss']
})
// This component displays one set in the current user's collection...
export class QueryMyCollectionComponent implements OnInit {
  public displaySet: any;
  public setData: any;
  public setFinder: FormGroup;
  public showSection = false;

  constructor (
               private formBuilder: FormBuilder,
               public mySetDatabase: MySetsDatabaseService) {
  }

  ngOnInit() {
    this.setFinder = this.formBuilder.group({
            setNumber: [
              '',
              Validators.compose([Validators.required])
            ],
            disabled: [false]
          });
  }

  getOneOfMySets() {
    let numberOfSet;
        numberOfSet = this.setFinder.get('setNumber').value;
    this.mySetDatabase.getOneSet(numberOfSet)
      .subscribe(set => {
        this.setData = (JSON.stringify(set));
        this.displaySet = JSON.parse(this.setData);
        this.showSection = true;
      });
  }
}
