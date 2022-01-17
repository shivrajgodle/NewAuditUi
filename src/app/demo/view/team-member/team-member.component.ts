import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientServiceService } from 'src/app/Services/client-service.service';
import { ProjectServiceService } from 'src/app/Services/project-service.service';

interface ClientId{
  clientId:string;
}

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {

  teamForm!: FormGroup;
 clientIds:ClientId[];
 selectedClientId:string;
 selectedProjectId:string;
 
 projectData:any;

  constructor(private router: Router ,private messageService: MessageService,private service:ClientServiceService,private proService:ProjectServiceService) {
    this.clientIds=[
      {clientId:"20001"},
      {clientId:"20002"},
      {clientId:"20003"},
      {clientId:"20004"},
      {clientId:"20005"},
    ]
  }

  ngOnInit(): void {

    this.proService.getProjectDetails().subscribe(
      (data)=>{
        console.log(data['content'],"project data");
        this.projectData=data['content'];
      },
      (error)=>{
        alert("something went wrong");
      }
    )

    this.service.getClientData().subscribe((data)=>{
      console.log(data['content']);
    },
    (error)=>{
      alert("something went wrong...!!");
    })

    this.teamForm=new FormGroup({
      cliendId:new FormControl(''),
      projectId:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      departmentName:new FormControl('',Validators.required),
      location:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      reportingTo:new FormControl('',Validators.required)
    });
  }

  onSave() {
//    this.teamForm.value.clientId=this.selectedClientId['clientId'];
    console.log(this.teamForm.value);
    alert("done...!!")

    // this.service.projectData(this.teamForm.value).subscribe(
    //   (data:any)=>{
    //     alert("sproject data successfully added");
    //     console.log(data);
    //     this.router.navigate(['/uikit/docUpload']);   
    //   },
    //   (error)=>{
    //     alert("something went wrong");
    //   }
    // );
  }


}
