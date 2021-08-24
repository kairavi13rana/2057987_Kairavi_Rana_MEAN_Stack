let fs = require("fs");
let data = require("readline-sync");
let firstname = data.question("Enter the first name:");
let lastname = data.question("Enter the last name:");
let gender = data.question("Enter the Gender:");
let email = data.questionEMail("Enter the email address:");
let v = Date.now();
let x = new Date(v);

let emps=JSON.parse(fs.readFileSync("emp.json").toString());
debugger
let emp = {firstname,lastname,gender,email,x};
emps.push(emp);
debugger
fs.writeFileSync("emp.json",JSON.stringify(emps))

