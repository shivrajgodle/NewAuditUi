import { Url } from "url";

export interface Document{
    clientSpecific?:boolean;
    projectId?:string;
    docType?:string;
    fileFormat?:string;
    fileURL?:Url;
    description?:string;
    status?:string;
}