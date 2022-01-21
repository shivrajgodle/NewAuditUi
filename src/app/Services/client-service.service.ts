import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../demo/view/client/model/client';
import { TeamMember } from '../demo/view/team-member/model/teammember';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http:HttpClient){}

  getClientData() {
    //calling backed API
    return this.http.get<Client>(`${environment.baseUrl}/clients`);
  }

  getClintById(id:any){
    console.log(`${environment.baseUrl}/clients/${id}`);
    
    return this.http.get(`${environment.baseUrl}/clients/${id}`);
  }

  putClientData(data: Client,id:string) {    
    //calling backed API
    return this.http.put<Client>(`${environment.baseUrl}/clients/${id}`, data);
  }

  getTeam() {
    //calling backed API
    return this.http.get<TeamMember>(`${environment.baseUrl}/members`);
  }
  addTeam(data: TeamMember) {
    //calling backed API
    return this.http.post<TeamMember>(`${environment.baseUrl}/members`, data);
  }
  editTeam(memberId: string, data: TeamMember) {
    console.log("edit team", data);

    return this.http.put(`${environment.baseUrl}/members/${memberId}`, data);
  }

  deleteTeamMember(id:string)
    {
      return this.http.delete<any>(`${environment.baseUrl}/members/${id}`);
    }

}
