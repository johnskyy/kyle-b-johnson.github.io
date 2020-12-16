var unimportantArray = ["AIz","aS", "yDIeeoo", "42N0h", "UT", 
"Essr", "2sBEem", "yPQB","UL6JXU"];

var unimportantString = "";

for(i of unimportantArray)
    unimportantString += i;

document.getElementById('northMap').setAttribute('src',
"https://www.google.com/maps/embed/v1/place?key=" + unimportantString
    + "&q=Av.+Rafael+E.+Melgar+225,Cozumel+Quintana+Roo,Mexico");

    document.getElementById('southMap').setAttribute('src',
    "https://www.google.com/maps/embed/v1/place?key=" + unimportantString
        + "&q=Av.+Rafael+E.+Melgar+1,Cozumel+Quintana+Roo,Mexico");