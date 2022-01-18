import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../demo/domain/product';
import { Client } from '../demo/view/rules/client';
import { Project } from '../demo/view/subpro1/model/project';
import { User } from '../demo/view/users/model/users';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  data!:boolean;
  
  url = "http://localhost:8080/escrule";
  
  getProjectDetails() {
    return this.http.get(`${environment.baseUrl}/projects`);
  }

  constructor(private http:HttpClient) { }

  projectData(data: Project) {
    //calling backed API
    return this.http.post<Project>(`${environment.baseUrl}/projects`, data);
  }

  userData(data:User)
  {
    console.log(data);
    
    return this.http.post<User>(`${environment.baseUrl}/auditors`, data);
  }

  ruleData(data:any)
  {
    return this.http.post(`${environment.baseUrl}/escrule`, data);
  }


  // crud table service
  
  getClientData(){
    return this.http.get(this.url);
  }
 
  postClient(data:Client)
  {
    console.warn(data);
    return this.http.post(this.url,data);
  }
  updateClient(companyName: any,data: any)
  {
    return this.http.put(`${this.url}/${companyName}`,data);
  }


  getClientByName(companyName:any){
     return this.http.get(`${this.url}/${companyName}`);
  }
}
