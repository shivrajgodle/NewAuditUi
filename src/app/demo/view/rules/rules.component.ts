import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';

interface Level{
  level:string;
}

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
  level:Level[];

  selectedProjectId:string;
  selectedLevel:string;
  constructor(private router: Router ,private messageService: MessageService,private proservice:ProjectServiceService ) 
  { 
    this.level=[
      {level:"Low"},
      {level:"Mid"},
      {level:"High"},
      {level:"Very High"},
      {level:"Critical"},
      {level:"Blocked"}
    ]

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
    //console.log(this.ruleForm.value.projectId);
    this.ruleForm.value.level=this.selectedLevel['level'];   
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
