import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });
    
    

  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    nom: this.builder.control(''),
    prenom: this.builder.control(''),
    username: this.builder.control(''),
    email: this.builder.control(''),
    password: this.builder.control(''),
    address: this.builder.control(''),
    phoneNumber: this.builder.control(''),
    birthDate:  this.builder.control(''),
    connected:  this.builder.control(true),
    stateUser:  this.builder.control(true),
    enabled: this.builder.control(true)

  });

  loaduserdata(code: any) {
    this.service.GetUserbyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.registerform.setValue({
        id: this.editdata.id, 
        nom: this.editdata.nom,
        prenom: this.editdata.prenom,
        username: this.editdata.username,
        address : this.editdata.address,
        email: this.editdata.email,
        password: this.editdata.password ,
        phoneNumber: this.editdata.phoneNumber,
        birthDate: this.editdata.birthDate,
        connected: this.editdata.connected,
        stateUser: this.editdata.stateUser
        ,enabled: this.editdata.enabled
       
      });
    });
  }
  UpdateUser() {
    this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }

}