import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientServiceService } from 'src/app/Services/client-service.service';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { TeamMember } from './model/teammember';

import Swal from 'sweetalert2';

interface ClientId{
  clientId:string;
}

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {

  teamDialogue?: boolean;
  team1: TeamMember[] = [];
  team!: TeamMember;

  submitted?: boolean;

  teamForm!: FormGroup;
 clientIds:ClientId[];
 selectedClientId:string;
 selectedProjectId:string;
 projectId=localStorage.getItem('pcode');
 
 projectData:any;

  constructor(private router: Router ,private messageService: MessageService,private service:ClientServiceService,private proService:ProjectServiceService) {
  
  }

  ngOnInit(): void {

    this.service.getClientData().subscribe(
      (data)=>{
        console.log(data['content'],"all client data");
        this.clientIds=data['content'];
      },
      (error)=>{
        alert("something went wrong");
      }
    )

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

    this.service.getTeam().subscribe( (data: any) => {
      this.team1 = data["content"];
      console.log("all team data",this.team1);
      },
      (error) => {
          alert("something went wrong");
      })

    
  }


  //to open dialog box
  addTeam() {
    this.team = {};
    this.submitted = false;
    this.teamDialogue = true;
}
editTeam(team1: TeamMember){
  this.team = { ...team1 };
  // this.submitted=false;
  this.teamDialogue = true;
  console.log("akshay",team1);
}

 //to hide dialog box
 hideDialog() {
  this.teamDialogue = false;
  this.submitted = false;
}

deleteTeam(id: string){

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
            this.service.deleteTeamMember(id).subscribe(
            (data:any)=>{
              console.log("team member deleted successfully",data);
              this.ngOnInit();
            },
            (error)=>{
              alert("Something went wrong while deleting existing team member...!!")
            });
          } 
          else if (result.isDenied) 
          {
            Swal.fire("team member is Not Deleted", "", "info");
          }
  })


}

saveTeam(){

    this.team.cliendId = this.selectedClientId['id'];
    console.log("my team data",this.team);

    this.submitted = true;

    
      if (this.team.projectId) {
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

           
            this.team.cliendId = this.selectedClientId['id'];
           
            Swal.fire("Saved!", "", "success");
            //Logic for Update
            this.service.editTeam(this.team.memberId, this.team).subscribe(
              (data:any) => {
                console.log("Team updated",data);
                this.ngOnInit();
              },
              (error)=>{
                alert("something went wrong while updating new Team Member...!!")
              });
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      } 
      else {
        //code for Saving New Client
        
        this.team.cliendId = this.selectedClientId['id'];

        this.service.addTeam(this.team).subscribe(
          (data:any)=>{
            console.log("New rule addedd",data);
            this.ngOnInit();
            this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Team Member Added Successfully",
          });
        },
        (error)=>{
          alert("something went wrong while creating new Team Member ...!!")
        });
        this.teamDialogue = false;
     
    }





}



}
