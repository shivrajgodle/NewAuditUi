import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientServiceService } from 'src/app/Services/client-service.service';
import { Client } from './model/client';

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
  clientData:any;
  selectedClientId:string;
  clientsAllData:boolean=false;

  constructor(private router: Router ,private messageService: MessageService,private service:ClientServiceService) {}



  ngOnInit(): void {
    this.clientData={};
    this.service.getClientData().subscribe(
      (data)=>{
        this.clientIds=data['content'];
      },
      (error)=>{
        alert("something went wrong");
      }
    )

    
    this.clientForm=new FormGroup({
      clientId:new FormControl(''),
      groupCompany:new FormControl('',Validators.required),
      legalName:new FormControl(this.clientData.legalName,Validators.required),
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
    this.service.putClientData(this.clientForm.value,this.selectedClientId['id']).subscribe(
      (data:any)=>{
        alert("project data successfully updated");
        this.router.navigate(['/uikit/docUpload']);   
      },
      (error)=>{
        alert("something went wrong");
      }
    );
  }



  onClick()
  {
    this.clientsAllData=true;
    
    this.service.getClintById(this.selectedClientId['id']).subscribe(
      (data)=>{
        this.clientData=data;
      },
      (error)=>{
        alert("something went wrong..!!");
      });
  }

}
