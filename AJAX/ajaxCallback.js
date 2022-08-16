let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" +date.getMinutes()+"Mins:" +date.getSeconds()+"Secs";
}
function makeAJAXCall(methodType , url , callback ,async = true , data = null )
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        console.log(methodType+" State Changed Called at: "+showTime()+" Ready State: "+
                xhr.readyState+" Status: "+xhr.status);
        if(xhr.status === 4)
        {
            if(xhr.status === 200 || xhr.status === 201)
            {
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400)
            {
                console.log("Handle 400 Client Error or 500 Server Error at: "+showTime());
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data)
    {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else{xhr.send();}
    console.log(methodType+" request sent to the server at: "+showTime());
}
const getURL = "http://localhost:3000/Employee/"
function getUserDetails(data){
    console.log("Get User Data at: "+showTime()+"data: "+data)
}
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX to server at "+showTime());

const deleteURL  = "http://localhost:3000/Employee/18";
function userDeleted(data)
{
    console.log("User Deleted "+data)
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);

const postURL = "http://localhost:3000/Employee/";
const emplData = {"name": "Gita","salary":45000};
function userAdded(data)
{
    console.log("User added "+data)
}
makeAJAXCall("POST",postURL,userAdded,true,emplData)