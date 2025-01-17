import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://stylisimo.ddns.net:8082/api/api/category';
  private apiUrld = 'http://stylisimo.ddns.net:8082/api/api/categories';

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<Category> {
   
    return this.http.post<Category>(this.apiUrl, category);
  }

  getCategories () : Observable<Category[]> {
    return this.http.get<Category[]>('http://stylisimo.ddns.net:8082/api/api/categories');
  }
  deleteCategory(id: number): Observable<any> {
    const url = `${this.apiUrld}/${id}`;
    return this.http.delete(url)
      
  }
 

}

