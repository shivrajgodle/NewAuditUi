import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';


import Swal from 'sweetalert2';
import { RuleData } from '../crud-rules/model/rule';
import { Billing } from './model/billing';

interface Level {
    level: string;
}
interface Year {
    year: number;
}

interface Activity {
    activity: string;
}

interface ClientId {
    clientId: string;
}

@Component({
    selector: "app-billing-details",
    templateUrl: "./billing-details.component.html",
    styleUrls: ["./billing-details.component.scss"],
})
export class BillingDetailsComponent implements OnInit {
    rule1: Billing[] = [];
    rule!: Billing;

    errorMsg!: string;
    data: any;
    pcode: string;
    tcode: string;
    years: Year[];
    activities: Activity[] = [];
    clientIds: ClientId[];

    selectedYear!: number;
    selectedActivity!: string;
    selectedClient!: string;
    activeDate: string;
    deactiveDate: string;

    //for activation part
    checked1: boolean = true;
    loader: boolean = true;

    // selectedClient!:string;
    submitted?: boolean;
    ruleDialogue?: boolean;
    ruleEditDialogue?: boolean;

    projectData: any = [];
    levels: Level[];

    selectedLevel: string;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private service: ProjectServiceService
    ) {
        this.years = [];
        for (let i = 2022; i >= 1950; i--) {
            this.years.push({
                year: i,
            });
        }

        this.clientIds = [
            {
                clientId: "20001",
            },
            {
                clientId: "20002",
            },
            {
                clientId: "20003",
            },
            {
                clientId: "20004",
            },
            {
                clientId: "20005",
            },
        ];

        this.activities = [{ activity: "Active" }, { activity: "Deactive" }];
    }

    ngOnInit(): void {
        this.pcode = localStorage.getItem("pcode");
        this.tcode = localStorage.getItem("tcode");

        //fetching data from service method and display all data here...

        this.service.getProjectDetails().subscribe((data) => {
            this.projectData = data["content"];
        });

        this.service.getBillingData().subscribe(
            (data: any) => {
                this.rule1 = data["content"];
            },
            (error) => {
                alert("something went wrong");
            }
        );
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

    saveBill() {
        this.rule.projectCode = this.pcode;
        this.rule.taskCode = this.tcode;

        this.submitted = true;
        if (this.rule.projectCode?.trim()) {
            if (this.rule.projectId) {
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

                        if(this.selectedYear["year"]===undefined)
                        {
                            this.rule.annualYear =this.selectedYear
                        }
                        else
                        {
                            this.rule.annualYear =this.selectedYear['year']
                        }

                        if(this.selectedActivity["activity"]===undefined)
                        {
                            this.rule.activity =this.selectedActivity
                        }
                        else
                        {
                            this.rule.activity =this.selectedActivity['activity']
                        }

                        if(this.selectedClient["clientId"]===undefined)
                        {
                            this.rule.clientId =this.selectedClient
                        }
                        else
                        {
                            this.rule.clientId =this.selectedClient['clientId']
                        }

                        Swal.fire("Saved!", "", "success");
                        //Logic for Update
                        this.service
                            .editBillData(this.rule.projectId, this.rule)
                            .subscribe(
                                (data: any) => {
                                    this.ngOnInit();
                                },
                                (error) => {
                                    alert(
                                        "Something went wrong while updating existing Escalation rule...!!"
                                    );
                                }
                            );
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });
            } else {
                //code for Saving New Client

                this.rule.annualYear = this.selectedYear["year"];
                this.rule.clientId = this.selectedClient["clientId"];
                this.rule.activity = this.selectedActivity["activity"];
                this.rule.activatonDate = this.activeDate;
                this.rule.deactivatonDate = this.deactiveDate;

                this.service.BillingData(this.rule).subscribe(
                    (data: any) => {
                        this.ngOnInit();
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Client Created Successfully",
                        });
                    },
                    (error) => {
                        alert(
                            "something went wrong while creating new Escalation rule...!!"
                        );
                    }
                );
                this.ruleDialogue = false;
            }
        }
    }

    editBill(rule1: Billing) {
        this.rule = { ...rule1 };

        this.selectedYear = rule1.annualYear || rule1.annualYear["year"];
        this.selectedActivity = rule1.activity || rule1.activity["activity"];
        this.selectedClient = rule1.clientId || rule1.clientId["clientId"];
        this.ruleDialogue = true;
    }

  

  deleteBill(projectId:string){
 
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
            if (result.isConfirmed) {
                let currentUrl = this.router.url;
                Swal.fire("Deleted!", "", "success");
                //Logic for delete
                this.service.deleteBillData(projectId).subscribe(
                    (data: any) => {
                        console.log("Bill deleted successfully", data);
                        this.ngOnInit();
                    },
                    (error) => {
                        alert(
                            "Something went wrong while deleting existing Escalation rule...!!"
                        );
                    }
                );
            } else if (result.isDenied) {
                Swal.fire("Rule is Not Deleted", "", "info");
            }
    })

  }



}
      




