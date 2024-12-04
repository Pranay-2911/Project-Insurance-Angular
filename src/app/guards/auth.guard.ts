import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
 
    if (token) {
      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = payload.exp * 1000 < Date.now();
        const expectedRole = route.data['role'];
        if (!isTokenExpired) {
          if(localStorage.getItem('roleName')!==expectedRole){
            alert("You are not authorized to this page! Please log in again.");
            localStorage.removeItem('token');
            this.router.navigateByUrl('');
            return false;
          }
          return true; // Token is valid
        }
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }
    alert("You are logged out! Please log in again.");
    // Redirect to login if not authenticated
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 2000);
    return false;
  }
}