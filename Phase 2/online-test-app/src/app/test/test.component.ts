import { Component, OnInit } from '@angular/core';
import { Helper } from '../helper';
import { Quest } from '../quest';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ans } from '../ans';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  Form:FormGroup;
  questions?:Quest[];
  answers:Ans[] = [];
  counter: number = 0;
  showResults: boolean = false;
  pass:boolean = false;
  fail:boolean = false;

  constructor(public questionSer:Helper, public form:FormBuilder) { 
    this.Form=form.group({});
  }
  ngOnInit(): void {
    let answerSet: Ans;
    this.questionSer.getQuestion().subscribe(result=> {
      this.questions=result;
      this.questions.forEach(question=> {
        this.Form.addControl(question.question,this.form.control(""));
        answerSet = {correct:false,incorrect:false};
        this.answers.push(answerSet);
      })
    });
  }
  checkForTrue(index:number): boolean{
    return this.answers[index].correct;
  }
  checkForFalse(index:number): boolean{
    return this.answers[index].incorrect;
  }
  submitAnswers(){
    this.counter = 0;
    let index = 0;
    let submittedAnswers=this.Form.value;
    this.questions?.forEach(question => {

      if(submittedAnswers[question.question]==question.correctAns){
        this.answers[index].correct=true;
        this.answers[index].incorrect=false;
        this.counter++;
      }
      else{
        this.answers[index].correct=false;
        this.answers[index].incorrect=true;
      }
      index++;
    })
    this.showResults=true;
    if(this.counter>=6) {
      this.pass=true;
      this.fail=false;
    }
    else{
      this.pass=false;
      this.fail=true;
    }
  }
}