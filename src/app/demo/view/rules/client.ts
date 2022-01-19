export interface Client{
    id?:number;
    companyName?:string;
    pan?:string;
    tan?:string;
    groupCompany?:string;
    precisionId?:string;
    approver?:string;
    status?:boolean;
  }



  export interface ClientData{
    companyName?:string;
    pan?:string;
    tan?:string;
    groupCompany?:string;
    precisionId?:string;
    approver?:string;
    status?:boolean;
    id?:number;
    createdAt?:Date;
    updatedAt?:Date;
  }
  	
  export interface RuleData{
    
   id?:string;
   projectId?:string ;
	 trigger?:string ;
   level?:string ;
   escalationIds?:string ;
   noDaysNoResponse ?:number;
   reminderPeriod1 ?:number;
   reminderIds1 ?:string;
   reminderPeriod2 ?:number;
  reminderIds2 ?:string;
  reminderPeriod3  ?:number;
  reminderIds3 ?:string;
  templateEscalation ?:string;
  templateReminder ?:string;
  scope ?:string;
  entityIdStr ?:string;
  entityIdNum ?:string;
  }



  