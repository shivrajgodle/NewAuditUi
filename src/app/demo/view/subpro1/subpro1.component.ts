import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { DataSharedService } from 'src/app/data-shared.service';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
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
 
  constructor(private router: Router,private proservice:ProjectServiceService ,private messageService: MessageService, private service:DataSharedService) {
  this.years=[];
  for(let i=2022;i>=1950;i--)
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
    this.pcode=localStorage.getItem('pcode');
    this.tcode=localStorage.getItem('tcode');
    // this.pcode=this.service.getData1();
    // this.tcode=this.service.getData2();
    console.log(this.pcode, this.tcode);

    this.projectForm1=new FormGroup({
      projectCode:new FormControl(this.pcode,Validators.required),
      taskCode:new FormControl(this.tcode,Validators.required),
      projectDescription:new FormControl('',Validators.required),
      clientId:new FormControl(''),
      billingCode:new FormControl('',Validators.required),
      annualYear:new FormControl(''),
      activatonDate:new FormControl(''),
      deactivatonDate:new FormControl(''),
      gracePeriod:new FormControl('',Validators.required),
      activity:new FormControl('')
    });


    
  }

  onSave() {
    this.projectForm1.value.clientId=this.selectedClient['clientId'];
    this.projectForm1.value.annualYear=this.selectedYear['year'];
    this.projectForm1.value.activity=this.selectedActivity['activity'];
    this.projectForm1.value.activatonDate=this.activeDate;
    this.projectForm1.value.deactivatonDate=this.deactiveDate;
    
    console.log('inside project formgroup',this.activeDate);
    console.log(this.projectForm1.value);

    this.proservice.projectData(this.projectForm1.value).subscribe(
      (data:any)=>{
        alert("sproject data successfully added");
        console.log(data);
        this.router.navigate(['/uikit/users']);
        
      },
      (error)=>{
        alert("something went wrong");
      }
    );
  }
}
