import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Document } from '../demo/view/document/model/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) { }

  documentData(data:Document)
  {
    console.log(data);
    
    return this.http.post<Document>(`${environment.baseUrl}/documents`, data);
  }

  getDocumentData() {
    return this.http.get(`${environment.baseUrl}/documents`);
  }
  deleteDocumentData(id:string)
    {
      return this.http.delete<any>(`${environment.baseUrl}/documents/${id}`);
    }



}
