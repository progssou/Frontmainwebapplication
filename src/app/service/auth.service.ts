import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usermodel } from '../model/usermodel';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiurl='http://localhost:8080/api/auth/';
  
  
  constructor(private http:HttpClient) { 

  }


  login(username: string , password: string): Observable<any> {
    console.log('username '+username);
    console.log('password '+password);
 
    return this.http.post(
      AUTH_API + 'signin',
      {
        username ,
        password,
      },
      httpOptions
    );
  }



  register(username: string, nom:string, prenom:string, email: string, phoneNumber:number,birthDate : Date | null,
    password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        nom,
        prenom,
        email,
        phoneNumber,
        birthDate ,
        password,
      },
      httpOptions
    );
  } 
  
  
  
  RegisterUser(inputdata:any){
    
    console.log('afficher ' + inputdata);

    return this.http.post(AUTH_API + 'signup',inputdata)
  }

  GetUserbyCode(id:any){
    return this.http.get(AUTH_API + 'getUserById'+id);
  }
  

  Getall(){
    return this.http.get(AUTH_API +'/allUsers');
  }

  updateuser(id:any,inputdata:any){
    return this.http.put(AUTH_API +'/updateUser/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get(AUTH_API + '/role/getAllRoles' );
  }

  isloggedin(){
   
    return sessionStorage.getItem('username')!=null;
  }

  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  
  GetAllCustomer(){
    return this.http.get(this.apiurl);
  }

  Getaccessbyrole(role:any,menu:any){
    return this.http.get(this.apiurl+'/roleaccess?role='+role+'&menu='+menu)
  }

  


}