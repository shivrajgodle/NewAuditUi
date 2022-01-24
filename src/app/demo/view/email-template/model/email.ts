export interface EmailTemplate{
    templateid?:number ;

    templateName?:string;
    
    projectId?:number ;
    
    toList?:string;

    ccList?:string;

    bccList?:string;

    emailSubject?:string;

    emailBody?:string ;

    variables?:string ;

}