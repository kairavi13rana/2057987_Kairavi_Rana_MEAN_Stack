// load the module 
let http  = require("http");
let url = require("url");
let fs = require("fs");
let indexpage = `
    <html>
        <head>
        <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AddTask</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        </head>
        <body>
        <h2>Task Planner</h2>
        <a href="AddTask">Add Task Page </a> |
        <a href="DeleteTask">Delete Task Page</a> |
        <a href="ListTask">List Task Page </a>
        </body>
</html>

`
let AddTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    <h2>Add Task</h2>
<form action = "CheckTask">
    <label class = "form-lable"> Emp ID</label>
    <input type="text" class="form-control" name = "ID" id="eid" requrired/><br/>
    <label class = "form-lable">Task ID</label>
    <input type="text"  class="form-control" name = "TaskID" id="tid" required/><br/>
    <label class = "form-lable">Task</label>
    <input type="text" class="form-control"  name = "Task" id= "tname" required/><br/>
    <label class = "form-lable">Deadline</label>
    <input type="date" class="form-control" name = "Date" id="date" required/><br/>
    <input type="submit" value="Add Task"> <br/>
    <a href = "Home"> Home </a>
</form>    
</body>
</html>
`

let DeleteTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    <h2>Delete Task</h2>
<form>
    <label> Task ID</label>
    <input type="text" name = "TaskID"/><br/>
    <input type="submit" value="Delete Task"/> <br/>
    <a href = "Home"> Home </a>
</form>    
</body>
</html>
`
let ListTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    <h2>List All Task</h2>

    <table border = "1">
    <tr>
        <th> Emp ID</th>
        <th>Task ID</th>
        <th>Task</th>
        <th>Deadline</th>
    </tr>

    <a href = "Home">Home</a>
</body>
</html>
`
let server = http.createServer((request,response)=> {
        let urlInfo = url.parse(request.url,true);
        if(urlInfo.path!="/favicon.ico"){
           if(urlInfo.path =="/AddTask" ){
            response.write(AddTask);
        }else if(urlInfo.pathname == "/CheckTask"){
            let ATask = urlInfo.query;
            let Data = JSON.parse(fs.readFileSync("data.json").toString());
            Data.push(ATask); 
            fs.writeFileSync("Data.json",JSON.stringify(Data));
            
            response.writeHead(200,{"content-type":"text/html"});
            response.write(AddTask);
            response.write("<span style='color:blue'><b>Task Stored Successfully</b></span>"); 
            
        
        }else if(urlInfo.path == "/DeleteTask"){
            let ATask = urlInfo.query;
            let Data = JSON.parse(fs.readFileSync("data.json").toString());
            let index = Data.findIndex(cVar =>cVar.TaskId == ATask.TaskId);
            response.writeHead(200,{"content-type":"text/html"});

            if (index != -1){
                Data.splice(index,1);   
                fs.writeFileSync("Data.json",JSON.stringify(Data));
                response.write(DeleteTask);
                response.write("<span style='color:blue'><b>Task Deleted.</b></span>");
            }else{
                response.write("<span style='color:red'>Task Id is NOT Found </span>");
                response.write(DeleteTask);
            }
        
            
           }else if(urlInfo.path == "/ListTask"){
            response.write(ListTask);

            let Data = JSON.parse(fs.readFileSync("Data.json").toString());
            Data.find(l=>{
                response.write('<tr>');
                response.write('<td>');
                response.write(l.ID);
                response.write('</td>');
                response.write('<td>');
                response.write(l.TaskID);
                response.write('</td>');
                response.write('<td>');
                response.write(l.Task);
                response.write('</td>');
                response.write('<td>');
                response.write(l.Date);
                response.write('</td>');
                response.write('</tr>');
               
            });
            response.write('</table>');
        }else if(urlInfo.path == "/Home"){
            response.write(indexpage);
        } else{
               response.write(indexpage);
           }
        }
        response.end();
         
    });
server.listen(9090,()=>console.log("Server is running on port number 9090"))

