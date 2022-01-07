import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';

export interface Role{
  role:string;
}

export interface Experiance{
  experiance:string;
}

export interface expertise{
  expertise:string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers:[MessageService]
})
export class UsersComponent implements OnInit {

  userForm!: FormGroup;
  errorMsg!: string;

  roles:Role[];
  experiance:Experiance[];
  expertise:expertise[];

  selectedRole:string;
  selectedExp:string;
  selectedExperties:string;

  constructor(private router: Router ,private messageService: MessageService,private proservice:ProjectServiceService ) 
  { 
    this.roles=[
      {role:"Audit General"},
      {role:"Audit Planner"},
      {role:"Data Analyst"},
      {role:"Client Auditor"},
      {role:"Audit Lead"},
      {role:"Risk Specialist"},
    ]

    this.experiance=[
      {experiance:"less than 1 year"},
      {experiance:"1 to 2 years"},
      {experiance:"2 to 3 years"},
      {experiance:"3 to 4 years"},
      {experiance:"more than 5 years"},
    ]

    this.expertise=[
      {expertise:"RMF"},
      {expertise:"COSO"},
      {expertise:"Petrolium"}
    ]
  }

  ngOnInit(): void {
    // console.log(this.pcode1);
    this.userForm=new FormGroup({
      email:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      contact:new FormControl('',Validators.required),
      linedInPRofile:new FormControl('',Validators.required),
      role:new FormControl(''),
      experiance:new FormControl('',Validators.required),
      pastClients:new FormControl('',Validators.required),
      expertise:new FormControl(''),
      departmentName:new FormControl('',Validators.required),
      location:new FormControl('',Validators.required),
      reportingTo:new FormControl('',Validators.required),
      data1:new FormControl('',Validators.required),
      data2:new FormControl('',Validators.required),
      data3:new FormControl('',Validators.required),
    });


    
  }

  onSave() {

    this.userForm.value.role=this.selectedRole['role'];
    // this.userForm.value.experiance=this.selectedExp['experiance'];
    this.userForm.value.expertise=this.selectedExperties['expertise'];

    this.proservice.userData(this.userForm.value).subscribe(
      (data:any)=>{
        alert("User successfully added");
        console.log(data);
        this.router.navigate(['/uikit/rules']);
        
      },
      (error)=>{
        alert("something went wrong");
      }
    );
  }
}
