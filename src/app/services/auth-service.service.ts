import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  hasRole(expectedRole: string): boolean {
    const userRole = localStorage.getItem('role'); 
    return userRole === expectedRole;
  }


}
