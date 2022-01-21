import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, PrimeNGConfig, SelectItem } from "primeng/api";
import { ProjectServiceService } from "src/app/Services/project-service.service";

import Swal from "sweetalert2";
import { RuleData } from "./model/rule";

interface Level {
    level: string;
}
@Component({
    selector: "app-crud-rules",
    templateUrl: "./crud-rules.component.html",
    styleUrls: ["./crud-rules.component.scss"],
    providers: [MessageService],
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

    projectData: any = [];
    levels: Level[];

    selectedLevel: string;
    selectedProjectId: string;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private service: ProjectServiceService
    ) {
        this.levels = [
            { level: "Low" },
            { level: "Mid" },
            { level: "High" },
            { level: "Very High" },
            { level: "Critical" },
            { level: "Blocked" },
        ];
    }

    ngOnInit(): void {
        //fetching data from service method and display all data here...

        this.service.getProjectDetails().subscribe((data) => {
            this.projectData = data["content"];
        });

        this.service.getRuleData().subscribe(
            (data: any) => {
                this.rule1 = data["content"];
                console.log(this.rule1);
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

    //save client information
    saveRule() {
    
    //   if(this.selectedLevel===undefined)
    //   {
    //     this.selectedLevel=this.rule.level;
    //   }
      // console.log(this.selectedLevel,this.selectedProjectId,"akshay");

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

                     console.log(this.selectedLevel,this.selectedProjectId);
                     this.rule.level = this.selectedLevel["level"];
                     this.rule.projectId = localStorage.getItem('pcode');


                        Swal.fire("Saved!", "", "success");
                        //Logic for Update
                        this.service
                            .editRuleData(this.rule.id, this.rule)
                            .subscribe(
                                (data: any) => {
                                    console.log("rule updated", data);
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
               this.rule.level = this.selectedLevel["level"];
               this.rule.projectId = localStorage.getItem('pcode');
                this.service.ruleData(this.rule).subscribe(
                    (data: any) => {
                        console.log("New rule addedd", data);
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

    //Edit client information

    editRule(rule: RuleData) {
        this.rule = { ...rule };
        this.selectedLevel=rule.level
        // this.submitted=false;
        this.ruleDialogue = true;
        console.log(rule);
    }

    deleteRule(id: string) {
        Swal.fire({
            title: "Are you sure? want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "yes",
            denyButtonText: "No",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let currentUrl = this.router.url;
                Swal.fire("Deleted!", "", "success");
                //Logic for delete
                this.service.deleteRuleData(id).subscribe(
                    (data: any) => {
                        console.log("rule deleted successfully", data);
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
        });
    }
}
