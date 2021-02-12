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
var FORcast;
var img = " ";
var vardata;
var localstore2;


//math temprature
function temp1(temp){
    return ((temp - 273.15) * 9/5 + 32).toFixed(0);
}


//call api + get data
function getweather(){
    forcas.innerHTML = "";//clear forcast cashe
    var input = document.getElementById("input").value;
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
            // history = data.weather[0].main;
            if(input != undefined){
                if(!(previous.includes(input))){
                previous.push(input);
                window.localStorage.setItem("previous", JSON.stringify(previous));
                }
            }
        }
    });
    $.ajax({
        type: "GET", 
        url: "http://api.openweathermap.org/data/2.5/forecast?q="+input+"&appid=0013900bdb5821e8627c8eccc8185316",
        dataType: "json",
        success: function(data){
            //set data
            console.log(data);
            vardata = data

            //add event listener + today conditions
            document.getElementById("todayout").innerHTML = '<div class="collarge" style="padding:10px">Today in '+ input +'<br>'+ condition  + '<br>Humidity:' + humid + '<br>Temprature:' + temp1(temp) + '&#176;F<br>Wind Speed:' + wind  + '<br>' + '<input type="button" id = "nextbtn" value="Go to 5 day forcast"></div>'
            document.getElementById("nextbtn").addEventListener("click", rundata);
        }
    });

    //local storage
    for(let i=0; i < previous.length; i++){
        if(document.getElementById(previous[i]) == null){
            var localstore = document.createElement('div');
            localstore.innerHTML = '<input type="button" id="' + previous[i] + '" value="' + previous[i] + '" />'; //onclick = "' + textboxedit(previous[i]) + '"
            document.getElementById("savee").append(localstore);
        }
    }
}

//code needed to display forcast
function rundata(){
    forcas.innerHTML = "";
    document.getElementById("h2out").innerHTML = '5 Day Forcast:'
    for(var i=0; i < 40; i =i+8){    
        FORcast = vardata.list[i].dt_txt;
        console.log(vardata.list[i].weather[0].main);
        if(vardata.list[i].weather[0].main == "Rain"){
            img = '<img style = "width:100px" src="images/rainy.png">' 
        }
        if(vardata.list[i].weather[0].main  == "Sunny"){
            img = '<img style = "width:100px" src="images/sunny.jpg">' 
        }
        if(vardata.list[i].weather[0].main  == "Clear"){
            img = '<img style = "width:100px" src="images/clear.jpg">' 
        }
        if(vardata.list[i].weather[0].main  == "Snow"){
            img = '<img style = "width:100px" src="images/snowy.jpg">' 
        }
        if(vardata.list[i].weather[0].main  == "Clouds"){
            img = '<img style = "width:100px" src="images/cloudy.jpg">' 
        }
        console.log(FORcast);
        forcas.innerHTML += '<div class="col"><p>' + FORcast +'<br>' +'<br>'+ vardata.list[i].weather[0].main + '<br>'+ img +'<br>'+ vardata.list[i].weather[0].description + '<br>' + temp1(vardata.list[i].main.temp) + '&#176;F</p></div>';
    }
}

//get local storage
var previous = JSON.parse(window.localStorage.getItem("previous")) || [];

//change the value of the textbox 
$(".savee").click(function(event){
    const element = event.target;
    document.getElementById("input").value = element.value;
    console.log(element.value);
    getweather;
});

//0013900bdb5821e8627c8eccc8185316 location api
//http://api.openweathermap.org/data/2.5/forecast?id=
//0013900bdb5821e8627c8eccc8185316 specifics api