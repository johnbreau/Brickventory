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
  public displayFormSuccess = false;
  public sets: Set[];
  public displaySet: any;
  public setData: any;
  public showSection = false;
  public findSetFormClicked = false;
  public video: any;
  public showCaptureButton = false;
  public streaming = false;
  public canvas: HTMLCanvasElement;
  public ctx: any;
  public videoDisplayToggle: any;
  public capturedImage: string;
  public showCapturedImage = false;

  @ViewChild('videoElement') videoElement;

  constructor(
              private formBuilder: FormBuilder,
              public mySetsDatabase: MySetsDatabaseService,
              public bricksetScraperService: BricksetScraperService,
              public allSetsDatabase: LegoGroupSetsDatabaseService) {
  }

  ngOnInit() {
    this.videoDisplayToggle = document.getElementsByClassName('hideVideoElement');
    this.videoDisplayToggle[0].classList.add('hidden');
    this.video = this.videoElement.nativeElement as HTMLCanvasElement;

    // this.bricksetScraperService.bricketGetSet();

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

  start() {
    this.showCaptureButton = true;
    this.videoDisplayToggle[0].classList.remove('hidden');
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
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 320;
    this.canvas.height = 240;
  }

  capture() {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.capturedImage = this.canvas.toDataURL('image/jpeg');
    const video = this.video.srcObject.getTracks()[0];
    video.stop();
    this.videoDisplayToggle[0].classList.add('hidden');
    this.showCaptureButton = false;
    this.showCapturedImage = true;
  }

  closeBanner() {
    if (this.displayFormSuccess === true) {
      this.displayFormSuccess = false;
    } else {
      this.displayFormSuccess  = false;
    }
  }
}
