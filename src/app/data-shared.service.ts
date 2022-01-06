import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  pcode:string;
  tcode:string;

  constructor() { }

  setData(pcode:any, tcode:any)
  {
    this.pcode=pcode;
    this.tcode=tcode;

    console.log(this.pcode,this.tcode,"shiv");
    
  }

  getData1()
  {
    return this.pcode;
  }

  getData2(){
    return this.tcode;
  }

}
