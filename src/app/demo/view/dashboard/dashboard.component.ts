import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharedService } from 'src/app/data-shared.service';

interface TaskCode{
  taskCode:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  project!:FormGroup;
  taskcodes:TaskCode[];
  data:any;

  sideBar:boolean=true;

  selectedTaskCode:string;
  
  constructor(private router:Router, private service:DataSharedService) { 
    this.sideBar=false;
    localStorage.setItem('sideBar','this.sideBar');
    this.taskcodes=[
      {taskCode:"0101"},
      {taskCode:"0102"},
      {taskCode:"0103"},
      {taskCode:"0104"},
      {taskCode:"0105"},
      {taskCode:"0106"},
      {taskCode:"0107"},
    ]



    this.project = new FormGroup({
      projectCode: new FormControl('',Validators.required),
      taskCode: new FormControl(''),
    });
  }


  ngOnInit(): void {  }

  onSave()
  {
    this.project.value.taskCode=this.selectedTaskCode['taskCode'];
    this.data=this.project.value;
    this.service.setData(this.project.value.projectCode,this.project.value.taskCode);
    localStorage.setItem('pcode',this.project.value.projectCode);
    localStorage.setItem('tcode',this.project.value.taskCode);
    console.log(this.data);
  this.router.navigate(['/main']);    
  }

}
