function gallery(image) {
    var expandImg = document.getElementById("expandedImg");
    var imgID = document.getElementById("imgID");
    expandImg.src = image.src;
    imgID.innerHTML = image.alt;
    expandImg.parentElement.style.display = "block";
  }


var TotalPic=0;
function addData(){
    var Title = document.getElementById("title").value;
    var Article = document.getElementById("arti").value;
    var img = document.getElementById("img").value;


    var pic1 = "<div class=\"card blog\"><img class=\"card-img-top\" src=\"";
    var pic2 = "\" alt=\"\"><div class=\"card-body\"><h2>";
    var pic3 = "</h2><p class=\"card-text\">";
    var pic4 = "</p></div></div>";

    var temp = document.createElement("div");
    temp.id= TotalPic;
    temp.className = 'col-4';
    document.getElementById("row").appendChild(temp);
    document.getElementById(temp.id).innerHTML = pic1 +img+ pic2 +Title+ pic3 +Article +pic4;
    TotalPic++;
}




