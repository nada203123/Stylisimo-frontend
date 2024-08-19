import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subCategory } from '../models/subCategory';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private apiUrld = 'http://localhost:4000/subCategories/subCategories';

  constructor(private http: HttpClient) { }
  
  getCategories () : Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:4000/api/categories');
  }
  
  getSubCategories () : Observable<subCategory[]> {
    return this.http.get<subCategory[]>('http://localhost:4000/subCategories/subCategories');
  }

  addSubCategory(subcategory: subCategory) : Observable<subCategory> {
    return this.http.post<subCategory>('http://localhost:4000/subCategories/subCategory', subcategory);
   }
   deleteSubCategory(id: number): Observable<any> {
    const url = `${this.apiUrld}/${id}`;
    return this.http.delete(url)
      
  }
  getSubCategoryById(id: number): Observable<subCategory> {
    const url = `http://localhost:4000/subCategories/getsubCategory/${id}`;
    return this.http.get<subCategory>(url);
  }
  
  updateSubCategory(subcategory: any): Observable<any> {
    const url = `http://localhost:4000/subCategories/subCategory/${subcategory.id}`; 
    return this.http.put(url, subcategory);
  }
  
  getSubCategoriesByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/subCategories/ByCategory/${categoryId}`);
  }


}
