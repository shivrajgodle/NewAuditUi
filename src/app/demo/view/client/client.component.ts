import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientServiceService } from 'src/app/Services/client-service.service';

interface ClientId{
  clientId:string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  
  clientForm!: FormGroup;
  clientIds:ClientId[];

  selectedClientId:string;

  constructor(private router: Router ,private messageService: MessageService,private service:ClientServiceService) {
    
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



    
    this.clientForm=new FormGroup({
      clientId:new FormControl(''),
      groupCompany:new FormControl('',Validators.required),
      legalName:new FormControl('',Validators.required),
      ownershipNature:new FormControl('',Validators.required),
      industry:new FormControl('',Validators.required),
      sector:new FormControl('',Validators.required),
      clientContact1:new FormControl('',Validators.required),
      clientContact2:new FormControl('',Validators.required),
      clientContact3:new FormControl('',Validators.required)
    });
  }

  onSave() {
    this.clientForm.value.clientId=this.selectedClientId['clientId'];
    console.log(this.clientForm.value);
    

    this.service.postClientData(this.clientForm.value).subscribe(
      (data:any)=>{
        alert("sproject data successfully added");
        console.log(data);
        this.router.navigate(['/uikit/docUpload']);   
      },
      (error)=>{
        alert("something went wrong");
      }
    );
  }



  onClick()
  {
    console.log("data.....");
    
    this.service.getClintById("100002").subscribe(
      (data)=>{
        console.log(data);  
      },
      (error)=>{
        alert("something went wrong..!!");
      });
  }

}
