import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../demo/domain/product";
import { Billing } from "../demo/view/billing-details/model/billing";
import { Client } from "../demo/view/client/model/client";
import { RuleData } from "../demo/view/crud-rules/model/rule";
import { User } from "../demo/view/users/model/users";

@Injectable({
    providedIn: "root",
})
export class ProjectServiceService {
    data!: boolean;
    constructor(private http: HttpClient) {}
    url = "http://localhost:8080/escrule";



    getProjectDetails() {
        return this.http.get(`${environment.baseUrl}/projects`);
    }

    projectData(data: Billing) {
        return this.http.post<Billing>(`${environment.baseUrl}/projects`, data);
    }




    userData(data: User) {
        return this.http.post<User>(`${environment.baseUrl}/auditors`, data);
    }



    // crud table service
    getClientData() {
        return this.http.get(this.url);
    }

    postClient(data: Client) {
        console.warn(data);
        return this.http.post(this.url, data);
    }

    updateClient(companyName: any, data: any) {
        return this.http.put(`${this.url}/${companyName}`, data);
    }

    getClientByName(companyName: any) {
        return this.http.get(`${this.url}/${companyName}`);
    }

    
    
    
    ruleData(data: RuleData) {
        return this.http.post(`${environment.baseUrl}/escrule`, data);
    }
    
    getRuleData() {
        return this.http.get(`${environment.baseUrl}/escrule`);
    }

    deleteRuleData(id: string) {
        return this.http.delete<any>(`${environment.baseUrl}/escrule/${id}`);
    }

    editRuleData(id: number, data: RuleData) {
        return this.http.put(`${environment.baseUrl}/escrule/${id}`, data);
    }




    BillingData(data: Billing) {
        return this.http.post<Billing>(`${environment.baseUrl}/projects`, data);
    }

    getBillingData() {
        return this.http.get(`${environment.baseUrl}/projects`);
    }

    editBillData(id: string, data: Billing) {
        return this.http.put(`${environment.baseUrl}/projects/${id}`, data);
    }

    deleteBillData(id: string) {
        return this.http.delete<any>(`${environment.baseUrl}/projects/${id}`);
    }
}
