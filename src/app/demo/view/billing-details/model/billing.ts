export interface Billing
{

    projectId?: string;
    projectCode?: string ;
    
    taskCode?:string ;
    
    projectDescription?:string;

    clientId?:string;
 
    billingCode?:string;

    annualYear?:number;	
    
    // activatonDate?:Date;	

    // deactivatonDate?:Date;	

    activatonDate?:string;	

    deactivatonDate?:string;	
        
    gracePeriod?:string;	
            
    activity?:string ;

}