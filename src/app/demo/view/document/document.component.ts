import { Component, OnInit } from "@angular/core";
import { DocumentService } from "src/app/Services/document.service";
import { Document } from "./model/documents";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

interface Specific {
    clientSpecific: string;
}

@Component({
    selector: "app-document",
    templateUrl: "./document.component.html",
    styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {

    document1: Document[] = [];
    document!: Document;

    files: any = [];
    file: number;

    fileData=[];
    clientSpecifics: Specific[];

    selectedPreference: string;
    uploadedDocument!: Document;
    value: any;
    projectId:string;

    constructor(private service:DocumentService,private router: Router) {
        this.clientSpecifics = [
            { clientSpecific: "Client Specific" },
            { clientSpecific: "Regular" },
        ];
    }

    ngOnInit(): void {
        this.projectId=localStorage.getItem('pcode');
        this.uploadedDocument = {};


        this.service.getDocumentData().subscribe((data) => {
          this.document1 = data["content"];
      });
    }

    myUploader(event: any) {
        
        this.fileData = event.files;

       
        this.uploadedDocument.projectId=this.projectId;

         //for loop
                

         for(let i=0;i<this.fileData.length;i++)
         {
 
           //for removing . from file name
           let s = this.fileData[i].name.split('.')[0];
           this.uploadedDocument.description=s;
           
 
 
           //for removing application/filetype from file
           this.uploadedDocument.fileFormat=this.fileData[i].type;
           
           
 
           if(this.uploadedDocument.fileFormat.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
               
             this.uploadedDocument.fileFormat="excel";
 
           }
           else if(this.uploadedDocument.fileFormat.includes("application/pdf")){
            
             this.uploadedDocument.fileFormat="pdf";
           }
           else if(this.uploadedDocument.fileFormat.includes("image/jpeg")){
            
             this.uploadedDocument.fileFormat="jpeg";
           }
           else if(this.uploadedDocument.fileFormat.includes("image/png")){
           
             this.uploadedDocument.fileFormat="png";
           }
           else if(this.uploadedDocument.fileFormat.includes("image/gif")){
           
             this.uploadedDocument.fileFormat="gif";
           }
           else if(this.uploadedDocument.fileFormat.includes("video/mp4")){
            
             this.uploadedDocument.fileFormat="mp4";
           }
 
        
 
           this.uploadedDocument.status="Uploaded";
 
         }

        this.service.documentData(this.uploadedDocument).subscribe(
          (data)=>{
            alert("Document uploaded successfully");
            this.ngOnInit();
          },
          (error)=>{
            alert("something went wrong..!!");
          }
        )

        
 
 
    }


    deleteDocument(id:string){
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
                  this.service.deleteDocumentData(id).subscribe(
                      (data: any) => {
                        
                          this.ngOnInit();
                      },
                      (error) => {
                          alert(
                              "Something went wrong while deleting existing Document...!!"
                          );
                      }
                  );
              } else if (result.isDenied) {
                  Swal.fire("Document is Not Deleted", "", "info");
              }
      })
    }



    
    onClick() {
        this.files.push(this.file);
    }

    onSelect() {
        this.uploadedDocument.clientSpecific =
            this.selectedPreference["clientSpecific"];

        if (this.selectedPreference["clientSpecific"] === "YES") {
            this.uploadedDocument.clientSpecific = true;
        } else {
            this.uploadedDocument.clientSpecific = false;
        }


       

    }
}
