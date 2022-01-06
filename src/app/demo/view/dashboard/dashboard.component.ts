import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataSharedService } from 'src/app/data-shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  project!:FormGroup;

  data:any;
  constructor(private router:Router, private service:DataSharedService) { 
    this.project = new FormGroup({
      projectCode: new FormControl('',Validators.required),
      taskCode: new FormControl('',Validators.required),
    });

    

  }


  ngOnInit(): void {
   
  }
  onSave()
  {
    this.data=this.project.value;
    this.service.setData(this.project.value.projectCode,this.project.value.taskCode)
    console.log(this.data,"akkkiii");
  this.router.navigate(['/uikit/project']);    
  }

}
