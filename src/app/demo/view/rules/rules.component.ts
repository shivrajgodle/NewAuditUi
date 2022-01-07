import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { Project } from '../subpro1/model/project';
import { Role } from '../users/users.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  providers:[MessageService]
})
export class RulesComponent implements OnInit {

  ruleForm!: FormGroup;
  errorMsg!: string;
  projectData:any=[];


  selectedProjectId:string;

  constructor(private router: Router ,private messageService: MessageService,private proservice:ProjectServiceService ) 
  { 

  }

  ngOnInit(): void {

    this.proservice.getProjectDetails().subscribe((data:any)=>{
     console.log(data['content']);
     this.projectData=data['content'];
     
    })

    

    // console.log(this.pcode1);
    this.ruleForm=new FormGroup({
      projectId:new FormControl(''),
      trigger:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      escalationIds:new FormControl('',Validators.required),
      noDaysNoResponse:new FormControl('',Validators.required),
      reminderPeriod1:new FormControl('',Validators.required),
      reminderIds1:new FormControl('',Validators.required),
      reminderPeriod2:new FormControl('',Validators.required),
      reminderIds2:new FormControl('',Validators.required),
      reminderPeriod3:new FormControl('',Validators.required),
      reminderIds3:new FormControl('',Validators.required),
      templateEscalation:new FormControl('',Validators.required),
      templateReminder:new FormControl('',Validators.required),
      scope:new FormControl('',Validators.required),
      entityIdStr:new FormControl('',Validators.required),
      entityIdNum:new FormControl('',Validators.required),
    });


    
  }

  onSave() {

    this.ruleForm.value.projectId=this.selectedProjectId['projectId'];

    this.proservice.ruleData(this.ruleForm.value).subscribe(
      (data:any)=>{
        alert("rule data successfully added");
        console.log(data);
        this.router.navigate(['/uikit/rules']);
        
      },
      (error)=>{
        alert("something went wrong");
      }
    );    
  }
}
