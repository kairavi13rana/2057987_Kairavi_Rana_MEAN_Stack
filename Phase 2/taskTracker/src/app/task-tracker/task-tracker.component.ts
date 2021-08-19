import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { taskDetails } from '../task.models';


@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {

  //for date part
  
  //call taskModels
  tArray : Array<taskDetails> = [];
  table:boolean = false; 
  constructor() { 
     
  }

  ngOnInit(): void {
  }

  taskadd(taskRef:NgForm){
    let taskEntry:taskDetails = taskRef.value; 
    this.tArray.push(taskEntry);
    console.log("array data:",this.tArray);

    console.log("array data:",taskEntry.id, taskEntry.name);

    console.log("array data:",taskEntry.task, taskEntry.tdate);
   
    this.table=true;
  }

}
