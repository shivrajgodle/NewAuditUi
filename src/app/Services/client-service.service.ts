import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../demo/view/client/model/client';

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

  postClientData(data: Client) {
    //calling backed API
    return this.http.post<Client>(`${environment.baseUrl}/clients`, data);
  }

}
