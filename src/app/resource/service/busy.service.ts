import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(private spinner: NgxSpinnerService) { }

  requestCount = 0;

  public busy(): void {
    this.requestCount++;
    this.spinner;
    this.spinner.show(undefined,{
      type: 'square-jelly-box',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#0CA2BB',
      size: 'medium'
    });
  }

  public unoccupied(): void {
    this.requestCount--;
    if(this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinner.hide();
    }
  }
}
