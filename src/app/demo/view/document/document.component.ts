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
    projectId:string;

    constructor(private service:DocumentService) {
        this.clientSpecifics = [
            { clientSpecific: "Client Specific" },
            { clientSpecific: "Regular" },
        ];
    }

    ngOnInit(): void {
        this.projectId=localStorage.getItem('pcode');
        this.uploadedDocument = {};
    }

    myUploader(event: any) {
        console.log(event["files"], "file Uploaded");
        this.fileData = event.files;

        for(let i=0;i<this.fileData.length;i++)
        {
//          this.uploadedDocument.fileURL=this.fileData[i].objectURL.changingThisBreaksApplicationSecurity;
          
          
          //for removing . from file name
          let s = this.fileData[i].name.split('.')[0];
          this.uploadedDocument.description=s;
          console.log("file name",this.uploadedDocument.description);


          //for removing application/filetype from file
          this.uploadedDocument.fileFormat=this.fileData[i].type;
          console.log("file format",this.uploadedDocument.fileFormat);
          

          if(this.uploadedDocument.fileFormat.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
              
            console.log("file is excel file");
            this.uploadedDocument.fileFormat="excel";

          }
          else if(this.uploadedDocument.fileFormat.includes("application/pdf")){
            console.log("file is pdf file");
            this.uploadedDocument.fileFormat="pdf";
          }
          else if(this.uploadedDocument.fileFormat.includes("image/jpeg")){
            console.log("file is jpeg file");
            this.uploadedDocument.fileFormat="jpeg";
          }
          else if(this.uploadedDocument.fileFormat.includes("image/png")){
            console.log("file is png file");
            this.uploadedDocument.fileFormat="png";
          }
          else if(this.uploadedDocument.fileFormat.includes("image/gif")){
            console.log("file is gif file");
            this.uploadedDocument.fileFormat="gif";
          }
          else if(this.uploadedDocument.fileFormat.includes("video/mp4")){
            console.log("file is mp4 file");
            this.uploadedDocument.fileFormat="mp4";
          }




          

        


        //   console.log("file format",this.uploadedDocument.fileFormat);

          this.uploadedDocument.status="Uploaded";

         
          
        }

        console.log(this.uploadedDocument);
        this.uploadedDocument.projectId=this.projectId;
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
