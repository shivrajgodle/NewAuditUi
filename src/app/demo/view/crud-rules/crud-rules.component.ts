import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';


import Swal from 'sweetalert2';
import { RuleData } from './model/rule';

interface Level{
  level:string;
}
@Component({
  selector: 'app-crud-rules',
  templateUrl: './crud-rules.component.html',
  styleUrls: ['./crud-rules.component.scss'],
  providers:[MessageService]
})
export class CrudRulesComponent implements OnInit {

  rule1: RuleData[] = [];
  rule!: RuleData;

  //for activation part
  checked1: boolean = true;
  loader: boolean = true;

  submitted?: boolean;
  ruleDialogue?: boolean;
  ruleEditDialogue?: boolean;

  projectData:any=[];
  levels:Level[];

  selectedLevel:string;

  constructor(private router: Router,private messageService: MessageService,private service:ProjectServiceService) 
  {
    this.levels=[
      {level:"Low"},
      {level:"Mid"},
      {level:"High"},
      {level:"Very High"},
      {level:"Critical"},
      {level:"Blocked"}
    ]
  }

  ngOnInit(): void {
    //fetching data from service method and display all data here...

    this.service.getProjectDetails().subscribe(
      (data)=>{
        this.projectData=data['content'];
      }
    )

<<<<<<< HEAD

    this.proservice.getRuleData().subscribe((data:RuleData)=>{
      // if(data) 
      // {
      //   this.hideloader();
      // }
       console.log("i am from getRule data",data);
       // this.ruleData = data['content']
       this.client=data['content'];
      console.log("i am from init",this.client);
    
       
     })


    this.proservice.getProjectDetails().subscribe((data:any)=>{
      if(data) 
     {
       this.hideloader();
     }
     console.log(data['content']);
     this.projectData=data['content'];
     
     console.log("i am from project details",this.projectData);
     
     
    })

     this.primengConfig.ripple = true;
  }

  hideloader() {
    this.loader=false;
  }

  // onSave() {

  //   this.submitted=true;

  //   this.ruleForm.value.projectId=this.selectedProjectId['projectId'];
  //   //console.log(this.ruleForm.value.projectId);
  //   this.ruleForm.value.level=this.selectedLevel['level']; 

  //   console.log("ninad",this.ruleForm.value);

  //   this.proservice.ruleData(this.ruleForm.value).subscribe(
  //     (data:any)=>{
  //       alert("rule data successfully added");
  //       console.log(data);
  //       // this.router.navigate(['/uikit/rules']);
  //       window.location.reload();
=======
    this.service.getRuleData().subscribe(
      (data: any)=>{
        this.rule1 = data["content"];
        console.log(this.rule1);
>>>>>>> v4_19thjan
        
      },
      (error)=>{
        alert("something went wrong");
      });
    }

  
    //to open dialog box
    addRule() {
      this.rule = {};
      this.submitted = false;
      this.ruleDialogue = true;
    }

    //to hide dialog box
    hideDialog() {
      this.ruleDialogue = false;
      this.submitted = false;
    }

    //save client information
    saveRule() {
      this.submitted = true;
      if (this.rule.trigger?.trim()) {
      if (this.rule.id) {
        //swal fire code starts here
        this.hideDialog();
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.rule.level=this.selectedLevel['level'];
            Swal.fire("Saved!", "", "success");
            //Logic for Update
            this.service.editRuleData(this.rule.id, this.rule).subscribe(
              (data:any) => {
                console.log("rule updated",data);
                this.ngOnInit();
              },
              (error)=>{
                alert("Something went wrong while updating existing Escalation rule...!!")
              });
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      } else {
        //code for Saving New Client
        this.rule.level=this.selectedLevel['level'];

        this.service.ruleData(this.rule).subscribe(
          (data:any)=>{
            console.log("New rule addedd",data);
            this.ngOnInit();
            this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Client Created Successfully",
          });
        },
        (error)=>{
          alert("something went wrong while creating new Escalation rule...!!")
        });
        this.ruleDialogue = false;
      }
    }
  }

  //Edit client information

  editRule(rule: RuleData) {
    this.rule = { ...rule };
    // this.submitted=false;
    this.ruleDialogue = true;
    console.log(rule);
  }

  deleteRule(id:string)
  {
    Swal.fire(
      {
        title: "Are you sure? want to delete?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
      }).then(
        (result)=>{
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) 
            {
              let currentUrl = this.router.url;
              Swal.fire("Deleted!", "", "success");
              //Logic for delete
              this.service.deleteRuleData(id).subscribe(
              (data:any)=>{
                console.log("rule deleted successfully",data);
                this.ngOnInit();
              },
              (error)=>{
                alert("Something went wrong while deleting existing Escalation rule...!!")
              });
            } 
            else if (result.isDenied) 
            {
              Swal.fire("Rule is Not Deleted", "", "info");
            }
    })
  }
}
