import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EmailTemplate } from "../demo/view/email-template/model/email";

@Injectable({
    providedIn: "root",
})
export class EmailTemplateService {
    constructor(private http: HttpClient) {}

    getEmailTemplates() {
        return this.http.get(`${environment.baseUrl}/etemplates`);
    }

    editTemplateData(id: any, data: any) {
        return this.http.put(`${environment.baseUrl}/etemplates/${id}`, data);
    }

    emailTemplate(data: EmailTemplate) {
        return this.http.post(`${environment.baseUrl}/etemplates`, data);
    }

    deleteTemplate(id:number)
    {
      return this.http.delete<EmailTemplate>(`${environment.baseUrl}/etemplates/${id}`);
    }
}
