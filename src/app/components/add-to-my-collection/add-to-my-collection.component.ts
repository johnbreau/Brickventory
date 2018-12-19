import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
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
  public usingCamera = false;
  public video: any;
  public captureButton: any;
  public streaming = false;
  public photoElement: any;
  public canvas: HTMLCanvasElement;
  public ctx: any;

  @ViewChild('videoElement') videoElement: any;

  constructor(
              private formBuilder: FormBuilder,
              public mySetsDatabase: MySetsDatabaseService,
              public bricksetScraperService: BricksetScraperService,
              public allSetsDatabase: LegoGroupSetsDatabaseService) {
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement as HTMLCanvasElement;
    this.captureButton = document.getElementById('startbutton');

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

  toggleCamera() {
    this.usingCamera = true;
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

  start() {
    this.initCamera({ video: true, audio: false });
  }
    initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      this.video.play();
    });

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.ctx = this.canvas.getContext('2d');
  }

   capture() {
    console.log('cap data', this.canvas);
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const dataURI = this.canvas.toDataURL('image/jpeg');
    console.log('dataURI', dataURI)
    // this.canvasElement.getContext('2d').drawImage(this.videoElement, 0, 0, 640, 480);
    // this.photoElement.getContext('2d').drawImage(this.canvasElement, 0, 0, 160, 120);
  }

  closeBanner() {
    if (this.displayFormSuccess === true) {
      this.displayFormSuccess = false;
    } else {
      this.displayFormSuccess  = false;
    }
  }
}
