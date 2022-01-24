import { Url } from "url";

export interface Document{
    id?:string
    clientSpecific?:boolean;
    projectId?:string;
    docType?:string;
    fileFormat?:string;
    fileURL?:Url;
    description?:string;
    status?:string;
}