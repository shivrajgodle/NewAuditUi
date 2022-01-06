import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataSharedService } from 'src/app/data-shared.service';
import { Project } from './model/project';

interface Year{
  year:number;
}

interface Activity{
  activity:string;
}

interface ClientId{
  clientId:string;
}


@Component({
  selector: 'app-subpro1',
  templateUrl: './subpro1.component.html',
  styleUrls: ['./subpro1.component.scss'],
  providers: [MessageService]

})
export class Subpro1Component implements OnInit{

  projectForm1!: FormGroup;
  errorMsg!: string;
  data:any;
  pcode:string;
  tcode:string;
  years:Year[];
  activities:Activity[]=[];
  clientIds:ClientId[];
  project:Project;

  selectedYear!:number;
  selectedActivity!:string;
  selectedClient!:string;
  activeDate:string;
  deactiveDate:string;
 
  constructor(private router: Router, private messageService: MessageService, private service:DataSharedService) {
  this.years=[];
  for(let i=1951;i<=2050;i++)
  {
    this.years.push({
      year:i      
    });
  }

  this.activities=[
    {activity:'Active'},
    {activity:'Deactive'}
  ]
    
  this.clientIds=[
    {
      clientId:'20001'
    },
    {
      clientId:'20002'
    },
    {
      clientId:'20003'
    },
    {
      clientId:'20004'
    },
    {
      clientId:'20005'
    }
  ]
}

  ngOnInit(): void {
    // console.log(this.pcode1);
    this.pcode=this.service.getData1();
    this.tcode=this.service.getData2();
    console.log(this.pcode, this.tcode);

    this.projectForm1=new FormGroup({
      projectCode:new FormControl(this.pcode,Validators.required),
      taskCode:new FormControl(this.tcode,Validators.required),
      pDescription:new FormControl('',Validators.required),
      clientId:new FormControl(''),
      bCode:new FormControl('',Validators.required),
      annualYear:new FormControl(''),
      activeDate:new FormControl(''),
      deactiveDate:new FormControl(''),
      gPeriod:new FormControl('',Validators.required),
      activity:new FormControl('')
    });


    
  }

  onSave() {
    this.projectForm1.value.clientId=this.selectedClient['clientId'];
    this.projectForm1.value.annualYear=this.selectedYear['year'];
    this.projectForm1.value.activity=this.selectedActivity['activity'];
    this.projectForm1.value.activeDate=this.activeDate;
    this.projectForm1.value.deactiveDate=this.deactiveDate;
    
    console.log('inside project formgroup',this.activeDate);
    console.log(this.projectForm1.value);
  }
}
