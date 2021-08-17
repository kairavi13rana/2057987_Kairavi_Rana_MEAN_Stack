import { Component, OnInit } from '@angular/core';
import { UserInfo, perInfo as inpInfo } from '../user.model'; 
import { NgForm } from '@angular/forms';
import { DataService as DataService } from '../user-data.service';
@Component({
  selector: 'app-sipli-portfolio',
  templateUrl: './sipli-portfolio.component.html',
  styleUrls: ['./sipli-portfolio.component.css']
})
export class SipliPortfolioComponent implements OnInit {

  message:string="";
  UserName:string="";
  ViewTemp :boolean = false; // To view T=Registaration form template
  HideLogin: boolean = true; // for login 
  showData: boolean =  false;
  showTable:boolean = false;

  //array declaration
  inpArr:Array<inpInfo> = [];

  //array declaration
  userArray : Array<UserInfo> = []
  constructor(public userData: DataService) { } 

  ngOnInit(): void {
  }

  // for the login page
  loginUser(loginRef:NgForm){
    let newArr = this.userArray;
    let login = loginRef.value; // access value

      // check for array length
    if  (newArr.length == 0 ){
        this.message="User not found";
    }
    for (let ab in newArr){
      let tempArr = Object.values(newArr[ab]);
      
      //check for credentials
      if (login.user == tempArr[2] && login.pass == tempArr[3])
      {
        this.message = "successful";
        this.UserName = tempArr[2]; // assign username to msg
        this.showData = true; // set true 
        this.HideLogin = false;
      }else{
        this.message="User not found";
      }
    } 
  } 
    
  viewTemp(){
    this.ViewTemp = true;
    this.HideLogin = false;
  }
// for the login button in registaration form
  backToLogin(){
    this.ViewTemp = false;
    this.HideLogin = true;
  }

  // for the signup page
  createSign(signUpRef:NgForm){
    //let signup = signUpRef.value;
    let signup:UserInfo = signUpRef.value; //access interfce DI service

    

    this.userArray.push(signup);

    signUpRef.reset();
  }

  // for the portFolio page
  saveData(cnameRef:any, cnoRef:any){
    let save:inpInfo = {cName:cnameRef.value, cNo:cnoRef.value};
    this.inpArr.push(save);

  }

  clickData(){ //after click on contact details
    this.showTable = true;
  }
}

