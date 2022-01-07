import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../demo/domain/product';
import { Project } from '../demo/view/subpro1/model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http:HttpClient) { }

  projectData(data: Project) {
    //calling backed API
    return this.http.post<Project>(`${environment.baseUrl}/projects`, data);
  }
}
