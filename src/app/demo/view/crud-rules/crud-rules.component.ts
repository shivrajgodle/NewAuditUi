import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, PrimeNGConfig, SelectItem } from "primeng/api";
import { ProjectServiceService } from "src/app/Services/project-service.service";

import Swal from "sweetalert2";
import { Level, ReminderPeriod, RuleData } from "./model/rule";

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
    reminderPeriods: ReminderPeriod[];

    selectedLevel: string;
    selectedProjectId: string;

    selectedReminderPeriod1: number;
    selectedReminderPeriod2: number;
    selectedReminderPeriod3: number;
    selectedTemplateReminder: string;
    selectedNoDaysNoResponse:number;


    _selectedColumns:any[];

    cols:any[];
    

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

        this.reminderPeriods = [
            { day: 5 },
            { day: 10 },
            { day: 15 },
            { day: 20 },
            { day: 25 },
            { day: 30 },
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
            },
            (error) => {
                alert("something went wrong");
            }
        );


        this.cols=[
            {field:'trigger',header:'Trigger'},
            {field:'level',header:'Level'},
            {field:'escalationIds',header:'Escalation ID'},
            {field:'noDaysNoResponse',header:'No. Of days No Response'},
            {field:'reminderPeriod1',header:'Reminder Period1'},
            {field:'reminderIds1',header:'Reminder Id1'},
            {field:'reminderPeriod2',header:'Reminder Period2'},
            {field:'reminderIds2',header:'Reminder Id2'},
            {field:'reminderPeriod3',header:'Reminder Period3'},
            {field:'reminderIds3',header:'Reminder Id3'},
            {field:'templateEscalation',header:'Template Escalation'},
            {field:'templateReminder',header:'Template Reminder'},
            {field:'scope',header:'Scope'},
            {field:'entityIdStr',header:'Entity ID(String)'},
            {field:'entityIdNum',header:'Entity ID(Number)'},
        ];

        this._selectedColumns = this.cols;
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
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
                        this.rule.level = this.selectedLevel["level"];
                       
                        if(this.selectedReminderPeriod1["day"]===undefined)
                        {
                            this.rule.reminderPeriod1 =this.selectedReminderPeriod1
                        }
                        else
                        {
                            this.rule.reminderPeriod1 =this.selectedReminderPeriod1['day']
                        }

                        if(this.selectedReminderPeriod2["day"]===undefined)
                        {
                            this.rule.reminderPeriod2 =this.selectedReminderPeriod2
                        }
                        else
                        {
                            this.rule.reminderPeriod2 =this.selectedReminderPeriod2['day']
                        }

                        if(this.selectedReminderPeriod3["day"]===undefined)
                        {
                            this.rule.reminderPeriod3 =this.selectedReminderPeriod3
                        }
                        else
                        {
                            this.rule.reminderPeriod3 =this.selectedReminderPeriod3['day']
                        }

                        if(this.selectedTemplateReminder["day"]===undefined)
                        {
                            this.rule.templateReminder =this.selectedTemplateReminder
                        }
                        else
                        {
                            this.rule.templateReminder =this.selectedTemplateReminder['day']
                        }

                        if(this.selectedNoDaysNoResponse["day"]===undefined)
                        {
                            this.rule.noDaysNoResponse =this.selectedNoDaysNoResponse
                        }
                        else
                        {
                            this.rule.noDaysNoResponse =this.selectedNoDaysNoResponse['day']
                        }


                        this.rule.projectId = localStorage.getItem("pcode");

                        Swal.fire("Saved!", "", "success");
                        //Logic for Update
                        this.service
                            .editRuleData(this.rule.id, this.rule)
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
                this.rule.level = this.selectedLevel["level"];
                this.rule.reminderPeriod1 = this.selectedReminderPeriod1["day"];
                this.rule.reminderPeriod2 = this.selectedReminderPeriod2["day"];
                this.rule.reminderPeriod3 = this.selectedReminderPeriod3["day"];
                this.rule.templateReminder = this.selectedTemplateReminder["day"];
                this.rule.noDaysNoResponse = this.selectedNoDaysNoResponse["day"];
                this.rule.projectId = localStorage.getItem("pcode");


                this.service.ruleData(this.rule).subscribe(
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

    //Edit client information

    editRule(rule: RuleData) {
        this.rule = { ...rule };
        this.selectedLevel = rule.level;
        this.selectedNoDaysNoResponse=rule.noDaysNoResponse || rule.noDaysNoResponse['day'];
        this.selectedReminderPeriod1=rule.reminderPeriod1 || rule.reminderPeriod1['day'];
        this.selectedReminderPeriod2=rule.reminderPeriod2|| rule.reminderPeriod2['day'];
        this.selectedReminderPeriod3=rule.reminderPeriod3|| rule.reminderPeriod3['day']
        this.selectedTemplateReminder=rule.templateReminder|| rule.templateReminder['day']
        // this.submitted=false;
        this.ruleDialogue = true;
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
