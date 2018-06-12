import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient) { 
      this.authorizeUser();
  }

  ngOnInit() {
  }

  authorizeUser(){
    try{
      const accessToken = JSON.parse(window.localStorage.getItem('access-token'));
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'access-token': accessToken.token
        })
      };

      const username = accessToken.name;

      
      this.http.post('http://localhost:3000/auth',{name:username},httpOptions)
      .subscribe((data:any)=>{
        console.log(data);
        if(data.auth == 'success'){
          window.location.href = 'http://localhost:4200/profile'
        }
      })
    }catch{
      console.log('You are not logged in');
    }

  }

}
