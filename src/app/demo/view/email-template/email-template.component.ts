import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { EmailTemplateService } from "src/app/Services/email-template.service";
import Swal from "sweetalert2";
import { EmailTemplate } from "./model/email";

@Component({
    selector: "app-email-template",
    templateUrl: "./email-template.component.html",
    styleUrls: ["./email-template.component.scss"],
})
export class EmailTemplateComponent implements OnInit {
    
    pcode: string;
    emailTemplateData1: EmailTemplate[] = [];
    emailTemplateData!: EmailTemplate;

    //for activation part
    checked1: boolean = true;

    // selectedClient!:string;
    submitted?: boolean;
    emailTemplateDialogue?: boolean;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private service: EmailTemplateService
    ) {}

    ngOnInit(): void {
      this.emailTemplateData = {};
        this.pcode = localStorage.getItem("pcode");

        //fetching data from service method and display all data here...

        this.service.getEmailTemplates().subscribe((data) => {
            this.emailTemplateData1 = data["content"];
        });
    }

    //to open dialog box
    addTemplate() {
        this.emailTemplateData = {};
        this.submitted = false;
        this.emailTemplateDialogue = true;
    }

    //to hide dialog box
    hideDialog() {
        this.emailTemplateDialogue = false;
        this.submitted = false;
    }

    saveTemplate() {
    
        this.submitted = true;
        if (this.emailTemplateData.templateName?.trim()) {
            if (this.emailTemplateData.projectId) {
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
                        this.emailTemplateData.projectId = parseInt(this.pcode);
                        Swal.fire("Saved!", "", "success");
                        //Logic for Update
                        this.service
                            .editTemplateData(
                                this.emailTemplateData.templateid,
                                this.emailTemplateData
                            )
                            .subscribe(
                                (data: any) => {
                                    console.log("Template updated", data);
                                    this.ngOnInit();
                                },
                                (error) => {
                                    alert(
                                        "Something went wrong while updating existing Template Data...!!"
                                    );
                                }
                            );
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });
            } else {
                //code for Saving New Client
                this.emailTemplateData.projectId = parseInt(this.pcode);

                this.service.emailTemplate(this.emailTemplateData).subscribe(
                    (data: any) => {
                        this.ngOnInit();
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Template Created Successfully",
                        });
                    },
                    (error) => {
                        alert(
                            "something went wrong while creating new Email Template...!!"
                        );
                    }
                );
                this.emailTemplateDialogue = false;
            }
        }
    }

    editTemplate(emailTemplateData1: EmailTemplate) {
        this.emailTemplateData = { ...emailTemplateData1 };
        this.emailTemplateDialogue = true;
    }

    deleteTemplate(id: number) {
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
                this.service.deleteTemplate(id).subscribe(
                    (data: any) => {
                        console.log("Template deleted successfully", data);
                        this.ngOnInit();
                    },
                    (error) => {
                        alert(
                            "Something went wrong while deleting existing Template Data...!!"
                        );
                    }
                );
            } else if (result.isDenied) {
                Swal.fire("Template is Not Deleted", "", "info");
            }
        });
    }
}
