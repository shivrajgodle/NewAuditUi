export interface RuleData {
    id?: number;
    projectId?: string;
    trigger?: string;
    level?: string;
    escalationIds?: string;
    noDaysNoResponse?: number;
    reminderPeriod1?: number;
    reminderIds1?: string;
    reminderPeriod2?: number;
    reminderIds2?: string;
    reminderPeriod3?: number;
    reminderIds3?: string;
    templateEscalation?: string;
    templateReminder?: string;
    scope?: string;
    entityIdStr?: string;
    entityIdNum?: string;
}



export interface Level {
    level: string;
}

export interface ReminderPeriod{
    day:number;
}