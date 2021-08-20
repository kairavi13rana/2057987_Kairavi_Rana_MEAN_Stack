import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quest } from './quest';

@Injectable({
  providedIn: 'root'
})
export class Helper {

  constructor(public http:HttpClient) {
   }

  getQuestion():Observable<Quest[]> {
    return this.http.get<Quest[]>("/assets/question.json");
  }


}
