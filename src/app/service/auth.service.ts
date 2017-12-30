import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private serverUrl = "http://localhost/tick_master_angular/server/public/api";                    // Url of the laravel server 

  constructor( private http:Http, private router:Router ) {
    
  } 

  /**
   * Login
   * @param credentials 
   */

  login( credentials )
  {
    // Populating request body
    let body = new URLSearchParams;
    Object.entries( credentials ).forEach(
      ([key, value]) => body.set( key, value )
    );
    // Creating request options
    let headers = new Headers;
    headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
    headers.append( 'X-Requested-With', 'XMLHttpRequest' );
    headers.append( 'Access-Control-Allow-Origin', '*' );
    let options = new RequestOptions({ headers : headers });
    // Send request
    return this.http.post( this.serverUrl + "/login", body.toString(), options ).map( response => {
      let result = response.json();
      localStorage.setItem( 'token', result.success.token );
      console.log( localStorage.getItem( 'token' ) );
      this.router.navigate( ['/'] );
    });
  }

  /**
   * Logout method 
   */

  logout() {
    localStorage.removeItem( 'token' );
    this.router.navigate( ['/login'] );
  }

  /**
   * isLoggedIn
   */

  isLoggedIn() {
    let token = localStorage.getItem( 'token' );
    if( typeof token != undefined )
      return true;
    else 
      return false;
  }

}
