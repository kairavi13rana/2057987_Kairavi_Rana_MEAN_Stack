import { Injectable } from '@angular/core';
import { UserInfo } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  userArr:Array<UserInfo> = [];

  setArray(userArr:Array<UserInfo>): void{
    this.userArr=userArr;
    console.log("new data is",userArr);
  }

   getArray(): Array<UserInfo>{
     return this.userArr;
   }
}
