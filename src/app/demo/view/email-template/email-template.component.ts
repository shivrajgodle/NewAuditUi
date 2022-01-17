import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {

  emailTemplateForm!: FormGroup;
  
  // selectedClientId:string;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.emailTemplateForm=new FormGroup({
      templateName:new FormControl(''),
      projectId:new FormControl(''),
      toList:new FormControl(''),
      ccList:new FormControl(''),
      bccList:new FormControl(''),
      emailSubject:new FormControl(''),
      emailBody:new FormControl(''),
      variables:new FormControl(''),
    });
  }

  onSave() {
//    this.emailTemplateForm.value.clientId=this.selected;
    console.log(this.emailTemplateForm.value);
    

    // this.service.postClientData(this.emailTemplateForm.value).subscribe(
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
