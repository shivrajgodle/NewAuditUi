import { Component, OnInit } from "@angular/core";
import { DocumentService } from "src/app/Services/document.service";
import { Document } from "./model/documents";

interface Specific {
    clientSpecific: string;
}

@Component({
    selector: "app-document",
    templateUrl: "./document.component.html",
    styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit {
    files: any = [];
    file: number;

    fileData=[];
    clientSpecifics: Specific[];

    selectedPreference: string;
    uploadedDocument!: Document;
    value: any;

    constructor(private service:DocumentService) {
        this.clientSpecifics = [
            { clientSpecific: "YES" },
            { clientSpecific: "NO" },
        ];
    }

    ngOnInit(): void {
        this.uploadedDocument = {};
    }

    myUploader(event: any) {
        console.log(event["files"], "file Uploaded");
        this.fileData = event.files;

        for(let i=0;i<this.fileData.length;i++)
        {
//          this.uploadedDocument.fileURL=this.fileData[i].objectURL.changingThisBreaksApplicationSecurity;
          
          this.uploadedDocument.description=this.fileData[i].name;
          this.uploadedDocument.fileFormat=this.fileData[i].type;
          this.uploadedDocument.status="Uploaded";
          
        }

        console.log(this.uploadedDocument);

        this.service.documentData(this.uploadedDocument).subscribe(
          (data)=>{
            alert("Document uploaded successfully");
          },
          (error)=>{
            alert("something went wrong..!!");
          }
        )
        

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
