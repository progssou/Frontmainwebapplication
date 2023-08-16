import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'souhaiel';
  isadmin=false;
  isMenuVisible=false;
  constructor(private route:Router){
    console.log('sessionStorage.getItem ' +sessionStorage.getItem('role') )
    let role=sessionStorage.getItem('role');
    console.log('jebheli ' +sessionStorage.getItem('role') )
    console.log('role ' +role  )
    if(role=='ROLE_ADMIN'){
      console.log('ROLE_ADMIN ' +role  )
      this.isadmin=true;
    } 
  }
  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role=sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register' ) {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.isadmin = true;
    }else{
      this.isadmin = false;
    }
  }
}
