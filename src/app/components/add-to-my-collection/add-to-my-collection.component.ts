import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MySetsDatabaseService } from '../../services/mySetsDatabaseService/my-sets-database.service';
import { LegoGroupSetsDatabaseService } from '../../services/legoGroupSetsDatabaseService/lego-group-sets-database.service';
import { BricksetScraperService } from '../../services/bricksetScraperService/brickset-scraper-service.service';
import { Set } from '../../interfaces/set.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-to-my-collection',
  templateUrl: './add-to-my-collection.component.html',
  styleUrls: ['./add-to-my-collection.component.scss']
})
export class AddToMyCollectionComponent implements OnInit {
  public scanData: {};
  public setForm: FormGroup;
  public findSetForm: FormGroup;
  public barcodeScannerValue: string;
  public scanFailed = false;
  public displayFormSuccess = false;
  public fromUPCDatabase: Observable<any>;
  public barcodeReturn: any;
  public sets: Set[];
  public displaySet: any;
  public setData: any;
  public showSection = false;
  public findSetFormClicked = false;

  constructor(
              private formBuilder: FormBuilder,
              public mySetsDatabase: MySetsDatabaseService,
              public bricksetScraperService: BricksetScraperService,
              public allSetsDatabase: LegoGroupSetsDatabaseService) {
  }

  ngOnInit() {
    this.bricksetScraperService.bricketGetSet();
    this.setForm = this.formBuilder.group({
      setName: [
        '',
        Validators.compose([Validators.required])
      ],
      setNumber: [
        '',
        Validators.compose([Validators.required])
      ],
      setPieces: '',
      setYear: '',
      setTheme: '',
      setLocation: '',
      imageURL: '',
      disabled: [false]
    });

    this.findSetForm = this.formBuilder.group({
      findSetFormNumber: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  findSetByNumber() {
    let inputNumber;
    inputNumber = {
      findSetFormNumber: this.findSetForm.get('findSetFormNumber').value,
    };
    this.allSetsDatabase.getOneSet(inputNumber.findSetFormNumber)
      .subscribe(set => {
        this.setForm.controls['setName'].setValue(set.name);
        this.setForm.controls['setNumber'].setValue(set.number);
        this.setForm.controls['setPieces'].setValue(set.pieces);
        this.setForm.controls['setYear'].setValue(set.year);
        this.setForm.controls['setTheme'].setValue(set.theme);
        this.setForm.controls['imageURL'].setValue(set.imageURL);
      })
    this.findSetFormClicked = true;
  }

  addSet() {
    let newSet;
    newSet = {
      setName: this.setForm.get('setName').value,
      setNumber : this.setForm.get('setNumber').value,
      setPieces : this.setForm.get('setPieces').value,
      setYear : this.setForm.get('setYear').value,
      setTheme : this.setForm.get('setTheme').value,
      setLocation: this.setForm.get('setLocation').value,
      imageURL: this.setForm.get('imageURL').value,
      // barcodeValue: this.barcodeGateway.getBarcodeData(this.barcodeValue),
    };
    console.log('newSet', newSet);
    this.mySetsDatabase.addToCollection(newSet)
      .subscribe(set => {
        this.displayFormSuccess = true;
        this.setForm.reset();
      });
  }

  // bricksetTester(){
  //   this.bricksetGateway.bricketGetSet();
  // }

  // scanButton() {
  //   this.barcodeScanner.scan()
  //     .then((barcodeData) => {
  //       this.barcodeGateway.getBarcodeData(barcodeData.text)
  //     .subscribe(barcodeObject => {
  //       this.barcodeReturn = barcodeObject;
  //       this.setForm.controls['setName'].setValue(barcodeObject.items[0].title);
  //       this.setForm.controls['setNumber'].setValue(barcodeObject.items[0].ean);
  //       this.setForm.controls['setPieces'].setValue(barcodeObject.items[0].title);
  //       this.setForm.controls['setYear'].setValue(barcodeObject.items[0].title);
  //       this.setForm.controls['setTheme'].setValue(barcodeObject.items[0].title);
  //       this.setForm.controls['setLocation'].setValue(barcodeObject.items[0].title);
  //     });
  //   });
  // }

  closeBanner() {
    if (this.displayFormSuccess === true) {
      this.displayFormSuccess = false;
    } else {
      this.displayFormSuccess  = false;
    }
  }
}
