var counter = 0;
var temp = [];
function addData(product, price) {
    console.log(product);
    console.log(price);
    var btnId = document.getElementById("value");
    btnId.innerHTML = "" + counter;
    var p = { product: null, price: null };
    if (product != null) {
        p = {
            'product': product,
            'price': price
        };
    }
    var cart = localStorage.getItem("cart");
    if (cart) {
        temp = JSON.parse(cart);
    }
    if (p.product != null) {
        temp.push(p);
    }
    localStorage.setItem("cart", JSON.stringify(temp));
    console.log("Data store in session and local storage");
    btnId.innerHTML = "" + temp.length;
}
function displayData() {
    var cart = localStorage.getItem("cart");
    var dataJson = JSON.parse(cart);
    var startTable = "<table border = 1,text-align:Center><tr> <th>Product</th> <th>Price</th></tr>";
    var tableContent = "";
    var row = document.createElement("tr");
    var total = 0;
    for (var i in dataJson) {
        console.log("i", dataJson[i]);
        tableContent += "<tr><td>" + dataJson[i].product + "</td>" + "<td>$" + dataJson[i].price + "</td><tr/>";
        total = total + dataJson[i].price;
    }
    console.log("table content", tableContent);
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    tableContent = tableContent + "<br/>Total : $" + total.toString();
    document.getElementById("main").innerHTML = tableContent;
}
