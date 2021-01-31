//the vars
var input = document.getElementById("input").value;
var output = document.getElementById("outp");
var forcas = document.getElementById("out");
var wind = "";
var date = "";
var temp = "";
var humid = "";
var uv = "";
var icon;
var condition = "";
var history;
var FORcast;
var localstore = "";
var img = " ";
//+future 5 day forcast
//math temprature
function temp1(temp){
    return ((temp - 273.15) * 9/5 + 32).toFixed(0);
 }

function store(inpu){
input.value = inpu;
}


//call api + get data
function getweather(){
    var input = document.getElementById("input").value;
    localstore += input + ","
    console.log("yoo");
        $.ajax({
        type: "GET", 
        url: "http://api.openweathermap.org/data/2.5/weather?q="+input+"&appid=0013900bdb5821e8627c8eccc8185316",
        dataType: "json",
        success: function(data){
            console.log(data);
            wind = data.wind.speed;
            console.log(wind);
            temp = data.main.temp;
            console.log(temp);
            humid = data.main.humidity;
            console.log(humid);
            console.log(data);        
            condition = data.weather[0].description;
            history = data.weather[0].main;
            
        }
    });
    $.ajax({
        type: "GET", 
        url: "http://api.openweathermap.org/data/2.5/forecast?q="+input+"&appid=0013900bdb5821e8627c8eccc8185316",
        dataType: "json",
        success: function(data){
            console.log(data);
                //run the code needed to display
                function rundata(){
                    document.getElementById("h2out").innerHTML = '5 day forcast:'
                    for(var i=0; i < 40; i =i+8){    
                        FORcast = data.list[i].dt_txt;
                        console.log(data.list[i].weather[0].main);
                        if(data.list[i].weather[0].main == "Rain"){
                            img = '<img style = "width:100px" src="rainy.png">' 
                        }
                        if(data.list[i].weather[0].main  == "Sunny"){
                            img = '<img style = "width:100px" src="sunny.jpg">' 
                        }
                        if(data.list[i].weather[0].main  == "Clear"){
                            img = '<img style = "width:100px" src="clear.jpg">' 
                        }
                        if(data.list[i].weather[0].main  == "Snow"){
                            img = '<img style = "width:100px" src="snowy.jpg">' 
                        }
                        if(data.list[i].weather[0].main  == "Clouds"){
                            img = '<img style = "width:100px" src="cloudy.jpg">' 
                        }
                        console.log(FORcast);
                        forcas.innerHTML += '<div class="col"><p>' + FORcast +'<br>' +'<br>'+ data.list[i].weather[0].main + '<br>'+ img +'<br>'+ data.list[i].weather[0].description + '<br>' + temp1(data.list[i].main.temp) + '&#176;F</p></div>';
                    }
                }

                document.getElementById("todayout").innerHTML = '<div class="collarge" style="padding:10px">Today<br>'+ condition  + '<br>Humidity:' + humid + '<br>Temprature:' + temp1(temp) + '&#176;F<br>Wind Speed:' + wind  + '<br>' + '<input type="button" id = "nextbtn" value="Go to 5 day forcast"></div>'
                document.getElementById("nextbtn").addEventListener("click", rundata());
        }
    });
    
    //local storage
    var res = localstore.split(",");
    localstore = '';
    for(var i = 0; i <res.length; i++){
        localstore = localstore + '<input type="button" value="'+res[i]+'" onclick = "store('+res[i]+')"';
    }
    console.log(localstore);
    localStorage.setItem("input", localstore);
    document.getElementById("savee").innerHTML = localStorage.getItem("input");
    console.log("yo");
}

//0013900bdb5821e8627c8eccc8185316 location api
//http://api.openweathermap.org/data/2.5/forecast?id=
//0013900bdb5821e8627c8eccc8185316 specifics api