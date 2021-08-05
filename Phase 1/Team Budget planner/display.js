function displayData(){
    let total = 0;
    let totalBudget = 0;
    const dataObj = localStorage.getItem("dataObj");
    const dataJson = JSON.parse(dataObj);    
    
    var startTable = "<table border = 1,text-align:Center><tr> <th>Client Name</th> <th>Project Name</th> <th>Budget</th> </tr>"  
    let tableContent = "";
    var row = document.createElement("tr")
    var row = " "
    for  (var i in dataJson){
       console.log("i", dataJson[i]);        
       tableContent += "<tr><td>"+dataJson[i].ClientName +"</td>" + "<td>"+dataJson[i].ProjectName +"</td>" + "<td>"+dataJson[i].Budget +"</td><tr/>";
       
       //console.log("table content", dataJson[i].Budget)
       total += parseFloat(dataJson[i].Budget)
    }
    
    //totalBudget += total;
    console.log("table content", tableContent);
    var endTable = "</table>"
    tableContent = startTable+tableContent+endTable
    tableContent = tableContent+"<br/>Total Budget of the all project: $"+total.toString()
    document.getElementById("main").innerHTML=tableContent; 

    
}